import { animate, group, query, sequence, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  animations: [
    //Animation de clignotement du curseur
    trigger('animateBlink', [
      state(
        'normal',
        style({
          opacity: 1,
        })
      ),
      state(
        'blinking',
        style({
          opacity: 0,
        })
      ),
      transition('normal <=> blinking', [animate('.01s')]),
    ]),
    //Animation de la phrase d'accroche
    trigger('animateCatchPhrase', [
      transition(':enter', [
        group([   //Utilisation de group plutôt que sequence parce que sequence ne fonctionne pas correctement
          /*
           * Animation de "Du design" à faire
           */
          // - Animation des lettres de "au code"
          query('.letter',[
            style({
              display: 'none'
            }),
            stagger('150ms',[
              animate('.1s 3.5s', style({
                display: 'inline'
              }))
            ]),
          ]),
        ])
      ]),
    ]),
  ],
})
export class HeroComponent {

  constructor() {}

  //Initialisation
  ngOnInit() {
    setInterval(() => {
      this.toggleBlink();
    }, 500);
  }

  //Animations de clignotement
  blinkState: string = 'normal';
  toggleBlink() {
    this.blinkState = this.blinkState === 'normal' ? 'blinking' : 'normal';
  }

  //Sons de clavier
  keyboardAudiosFiles = [
    '../../../assets/audio/keyboard/Son 01.mp3',
    '../../../assets/audio/keyboard/Son 02.mp3',
    '../../../assets/audio/keyboard/Son 03.mp3',
    '../../../assets/audio/keyboard/Son 04.mp3',
    '../../../assets/audio/keyboard/Son 05.mp3',
    '../../../assets/audio/keyboard/Son 06.mp3',
    '../../../assets/audio/keyboard/Son 07.mp3',
    '../../../assets/audio/keyboard/Son 08.mp3',
    '../../../assets/audio/keyboard/Son 09.mp3',
    '../../../assets/audio/keyboard/Son 10.mp3',
  ];
  // - Randomisation des sons de clavier
  playKeyboardAudio() {
    let audio = new Audio(
      this.keyboardAudiosFiles[Math.floor(Math.random() * 10)]
    );
    audio.play();
  }
  // - Affichage des lettres
  onAnimationStart() {
    const letters = document.querySelectorAll('.letter');
    setTimeout(() => {
      letters.forEach((letter, index) => {
        setTimeout(() => {
          this.playKeyboardAudio();
        }, index * 150);
      });
    }, 3500);
  }
}
