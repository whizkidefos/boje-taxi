import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>
  `,
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, IonRouterOutlet]
})
export class AppComponent {
  constructor() {}
}
