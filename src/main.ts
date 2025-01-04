import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from './app/app-routing.module';
import { initializeApp } from '@angular/fire/app';
import { getAuth } from '@angular/fire/auth';
import { getFirestore } from '@angular/fire/firestore';
import { FirebaseAppModule } from '@angular/fire/app';
import { AuthModule } from '@angular/fire/auth';
import { FirestoreModule } from '@angular/fire/firestore';

if (environment.production) {
  enableProdMode();
}

// Initialize Firebase
const app = initializeApp(environment.firebase);
const auth = getAuth(app);
const firestore = getFirestore(app);

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      IonicModule.forRoot({
        mode: 'ios',
        backButtonText: '',
        backButtonIcon: 'chevron-back-outline'
      }),
      AppRoutingModule,
      FirebaseAppModule,
      AuthModule,
      FirestoreModule
    )
  ]
}).catch(err => console.log(err));
