import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'pdv-theme';
  
  // Signal para el tema actual
  currentTheme = signal<Theme>(this.getInitialTheme());

  constructor() {
    // Efecto para aplicar el tema cuando cambia
    effect(() => {
      this.applyTheme(this.currentTheme());
      // Guardar en localStorage
      localStorage.setItem(this.STORAGE_KEY, this.currentTheme());
    });
  }

  /**
   * Obtiene el tema inicial desde localStorage o preferencia del sistema
   */
  private getInitialTheme(): Theme {
    // Intenta obtener del localStorage
    const saved = localStorage.getItem(this.STORAGE_KEY) as Theme | null;
    if (saved) {
      return saved;
    }

    // Si no hay guardado, usa la preferencia del sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }

  /**
   * Alterna entre light y dark theme
   */
  toggleTheme(): void {
    this.currentTheme.update(current => current === 'light' ? 'dark' : 'light');
  }

  /**
   * Establece un tema específico
   */
  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
  }

  /**
   * Aplica el tema al documento
   */
  private applyTheme(theme: Theme): void {
    const html = document.documentElement;
    const body = document.body;
    
    if (theme === 'dark') {
      html.classList.add('dark-theme');
      html.setAttribute('data-theme', 'dark');
      body.style.colorScheme = 'dark';
    } else {
      html.classList.remove('dark-theme');
      html.setAttribute('data-theme', 'light');
      body.style.colorScheme = 'light';
    }
  }
}
