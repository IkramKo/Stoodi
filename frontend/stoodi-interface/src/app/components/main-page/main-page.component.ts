import { Component, OnInit} from '@angular/core';
declare let particlesJS: any;


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  title = 'stoodi-interface';
  transcript = '';

  ngOnInit(): void {
    this.displayParticles();
  }

  private displayParticles() : void {    
    particlesJS.load('particles-js', '../assets/json/stars-particles.json', () => { console.log('Star particles loaded.') });
  }
  updateContent(content: string) {
    this.transcript = content;
  }
}
