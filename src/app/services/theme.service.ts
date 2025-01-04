import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeMode = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private theme = new BehaviorSubject<ThemeMode>(this.getInitialTheme());
  theme$ = this.theme.asObservable();

  constructor() {
    this.applyTheme(this.theme.value);
    this.handleSystemThemeChange();
  }

  getCurrentTheme(): ThemeMode {
    return this.theme.value;
  }

  toggleTheme(): ThemeMode {
    const themes: ThemeMode[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(this.theme.value);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    this.setTheme(nextTheme);
    return nextTheme;
  }

  setTheme(theme: ThemeMode) {
    localStorage.setItem('theme', theme);
    this.theme.next(theme);
    this.applyTheme(theme);
  }

  private getInitialTheme(): ThemeMode {
    return (localStorage.getItem('theme') as ThemeMode) || 'system';
  }

  private applyTheme(theme: ThemeMode) {
    let effectiveTheme: 'light' | 'dark';

    if (theme === 'system') {
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      effectiveTheme = theme;
    }

    document.body.classList.toggle('dark', effectiveTheme === 'dark');
  }

  private handleSystemThemeChange() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (this.theme.value === 'system') {
        this.applyTheme('system');
      }
    });
  }
}
