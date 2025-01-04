import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { UserTypeGuard } from './guards/user-type.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'signup',
        loadChildren: () => import('./pages/auth/signup/signup.module').then(m => m.SignupPageModule)
      }
    ]
  },
  {
    path: 'driver',
    canActivate: [AuthGuard, UserTypeGuard],
    data: { userType: 'driver' },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/driver/dashboard/dashboard.module').then(m => m.DashboardPageModule)
      }
    ]
  },
  {
    path: 'rider',
    canActivate: [AuthGuard, UserTypeGuard],
    data: { userType: 'rider' },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/rider/dashboard/dashboard.module').then(m => m.DashboardPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
