import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class WelcomePage implements OnInit {
  slides = [
    {
      title: 'Welcome to Boje Taxi',
      description: 'Your trusted ride-hailing service',
      image: 'assets/images/welcome-1.svg'
    },
    {
      title: 'Ride with Comfort',
      description: 'Experience safe and comfortable rides',
      image: 'assets/images/welcome-2.svg'
    },
    {
      title: 'Drive & Earn',
      description: 'Join our community of drivers and earn',
      image: 'assets/images/welcome-3.svg'
    }
  ];

  constructor(
    private router: Router,
    private animationCtrl: AnimationController
  ) {}

  ngOnInit() {}

  navigateToAuth(type: 'rider' | 'driver') {
    this.router.navigate(['/auth'], { queryParams: { type } });
  }

  // Animation for the buttons
  ionViewDidEnter() {
    const animation = this.animationCtrl
      .create()
      .addElement(document.querySelectorAll('.auth-buttons ion-button'))
      .duration(1000)
      .delay(500)
      .fromTo('transform', 'translateY(40px)', 'translateY(0px)')
      .fromTo('opacity', '0', '1');

    animation.play();
  }
}
