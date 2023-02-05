from aiohttp import web
import socketio
import aiohttp_cors

from pathlib import Path

app = web.Application()

# Setup handlers
async def index(request):
    return web.Response(text="Hello world")

# Setup application routes.
app.router.add_route("GET", "/api", index)

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
    await sio.emit('transcription_event', {
        'data': 'Transcription has started'
    })

sio.attach(app)
    
if __name__ == '__main__':
    web.run_app(app, port=8089)
    