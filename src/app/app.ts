import { Component, inject, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ThemeService } from './services/theme.service';

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

  constructor() {
    // Inicializar el tema al cargar la aplicación
    effect(() => {
      // El effect se ejecuta automáticamente con los cambios del tema
      this.themeService.currentTheme();
    });
  }
}
