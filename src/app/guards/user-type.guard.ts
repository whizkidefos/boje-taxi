import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserTypeGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const requiredType = route.data['userType'] as 'driver' | 'rider';

    return this.auth.user$.pipe(
      map(user => {
        if (user && user.userType === requiredType) {
          return true;
        }
        // If user is logged in but wrong type, redirect to their dashboard
        if (user) {
          const redirectPath = user.userType === 'driver' ? '/driver/dashboard' : '/rider/dashboard';
          return this.router.createUrlTree([redirectPath]);
        }
        // If not logged in, redirect to welcome
        return this.router.createUrlTree(['/welcome']);
      })
    );
  }
}
