import { Component, inject, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ThemeService } from './services/theme.service';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar />
    <router-outlet />
  `,
  styleUrl: './app.scss',
})
export class App {
  private themeService = inject(ThemeService);
  private languageService = inject(LanguageService);

  constructor() {
    // Inicializar el tema al cargar la aplicación
    effect(() => {
      // El effect se ejecuta automáticamente con los cambios del tema
      this.themeService.currentTheme();
    });

    // Inicializar el idioma al cargar la aplicación
    effect(() => {
      // El effect se ejecuta automáticamente con los cambios del idioma
      this.languageService.getCurrentLanguage();
    });
  }
}
