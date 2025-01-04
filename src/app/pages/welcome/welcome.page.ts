import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class WelcomePage implements OnInit {
  themeIcon = 'moon-outline';

  constructor(
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    // Set initial theme icon based on current theme
    this.updateThemeIcon(this.themeService.getCurrentTheme());
  }

  navigateToSignup(userType: 'driver' | 'rider') {
    this.router.navigate(['/auth/signup'], { 
      queryParams: { userType } 
    });
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  toggleTheme() {
    const newTheme = this.themeService.toggleTheme();
    this.updateThemeIcon(newTheme);
  }

  private updateThemeIcon(theme: 'light' | 'dark' | 'system') {
    switch (theme) {
      case 'light':
        this.themeIcon = 'moon-outline';
        break;
      case 'dark':
        this.themeIcon = 'sunny-outline';
        break;
      case 'system':
        this.themeIcon = 'contrast-outline';
        break;
    }
  }
}
