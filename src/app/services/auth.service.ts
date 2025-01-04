import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Firestore, doc, setDoc, onSnapshot, DocumentReference, DocumentData } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface UserProfile {
  uid: string;
  email: string;
  userType: 'driver' | 'rider';
  name?: string;
  phone?: string;
  photoURL?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = new BehaviorSubject<UserProfile | null>(null);
  public user$ = this.user.asObservable();

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {
    // Listen to auth state changes
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.getUserProfile(user.uid);
      } else {
        this.user.next(null);
      }
    });
  }

  async signUp(email: string, password: string, userType: 'driver' | 'rider', name: string) {
    try {
      const credential = await createUserWithEmailAndPassword(this.auth, email, password);
      
      // Create user profile in Firestore
      const userProfile: UserProfile = {
        uid: credential.user.uid,
        email,
        userType,
        name,
        photoURL: credential.user.photoURL || undefined
      };
      
      await this.createUserProfile(userProfile);
      return credential.user;
    } catch (error) {
      throw error;
    }
  }

  async signInWithGoogle(userType: 'driver' | 'rider') {
    try {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(this.auth, provider);
      
      // Create/update user profile in Firestore
      const userProfile: UserProfile = {
        uid: credential.user.uid,
        email: credential.user.email!,
        userType,
        name: credential.user.displayName || undefined,
        photoURL: credential.user.photoURL || undefined
      };
      
      await this.createUserProfile(userProfile);
      return credential.user;
    } catch (error) {
      throw error;
    }
  }

  async signIn(email: string, password: string) {
    try {
      const credential = await signInWithEmailAndPassword(this.auth, email, password);
      return credential.user;
    } catch (error) {
      throw error;
    }
  }

  async signOut() {
    try {
      await signOut(this.auth);
      this.user.next(null);
    } catch (error) {
      throw error;
    }
  }

  private async createUserProfile(profile: UserProfile) {
    try {
      const userRef = doc(this.firestore, `users/${profile.uid}`) as DocumentReference<DocumentData>;
      await setDoc(userRef, profile);
      this.user.next(profile);
    } catch (error) {
      throw error;
    }
  }

  private async getUserProfile(uid: string) {
    try {
      const userRef = doc(this.firestore, `users/${uid}`) as DocumentReference<DocumentData>;
      const unsubscribe = onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          const profile = doc.data() as UserProfile;
          this.user.next(profile);
        }
      });
      return () => unsubscribe();
    } catch (error) {
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return this.auth.currentUser !== null;
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  getUserType(): Observable<'driver' | 'rider' | undefined> {
    return this.user$.pipe(
      map(user => user?.userType)
    );
  }
}
