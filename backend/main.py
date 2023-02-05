import asyncio
import shlex
import subprocess
from aiohttp import web
import socketio
import aiohttp_cors
import os
import subprocess
import shlex
from fnmatch import fnmatch
import whisper
from pathlib import Path

from autocards import Autocards


app = web.Application()

# Setup handlers
async def index(request):
    return web.Response(text="Hello world")

async def flashcards_handler(request: web.Request):
    request.content
    return ''

# Setup application routes.
app.router.add_route("GET", "/api", index)
app.router.add_route("POST", "/api/flashcards", flashcards_handler)

cors = aiohttp_cors.setup(app, defaults={
"*": aiohttp_cors.ResourceOptions(
        allow_credentials=True,
        expose_headers="*",
        allow_headers="*",
    )
})

# Configure CORS on all routes.
for route in list(app.router.routes()):
    cors.add(route)

def find_files(directory, patterns):
    for root, dirs, files in os.walk(directory):
        for basename in files:
            for pattern in patterns:
                if fnmatch(basename, pattern):
                    filename = os.path.join(root, basename)
                    yield filename
                    
def convert_media_into_wav():
    media_patterns = ["*"]
    for filename in find_files('./files', media_patterns):
        mode = 0o777
        try:
            os.makedirs('./output', mode) 
        except OSError as error:
            print(error)
        output_name = filename.replace('./files', './output')
        subprocess.run(shlex.split(f'ffmpeg -i "{filename}" -ar 16000 -ac 1 -c:a pcm_s16le "{output_name}.wav"'))
        os.remove(filename)

def whisper_transcribe():
    audio_patterns = ["*.wav"]
    # Goes through all the folders in the Videos directory to retrieve the audio files for transcription
    for filename in find_files('./output', audio_patterns):
        subprocess.run(shlex.split(f'./whisper/main -m ./whisper/models/ggml-base.en.bin -f "{filename}" -t 8  -otxt'))
        os.remove(filename)

def read_transcription():
    pattern = ["*.txt"]
    for filename in find_files('./output', pattern):
        with open(filename) as f:
            return f.readlines()

def generate_flashcards(text: str):
    a = Autocards(in_lang="en", out_lang="en")
    a.clear_qa()
    a.consume_var(text, per_paragraph=True)
    a.to_json("./output/flashcards.json", prefix="")

sio = socketio.AsyncServer(
    async_mode='aiohttp',
    cors_allowed_origins=['http://127.0.0.1:4200', 'http://localhost:4200'], 
    )

@sio.event
async def connect(sid, environ, auth):
    print('connect ', sid)

@sio.event
async def disconnect(sid):
    print('disconnect ', sid)

@sio.event
async def upload_success(sid, data):
    print('upload success')
    convert_media_into_wav()
    await sio.emit('transcription_start', {
        'data': 'Transcription has started'
    })
    whisper_transcribe()
    txt = (" ".join(read_transcription()))
    await sio.emit('transcription_end', {
        'data': txt
    })
    

sio.attach(app)
    
if __name__ == '__main__':
    web.run_app(app, port=8089)
    