import { Injectable, effect, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type Language = 'es' | 'en';

interface Translations {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly STORAGE_KEY = 'pdv-language';
  private readonly DEFAULT_LANGUAGE: Language = 'es';
  
  // Signal para el idioma actual
  currentLanguage = signal<Language>(this.getInitialLanguage());
  
  // Signal para las traducciones cargadas
  translations = signal<Translations>({});
  
  constructor(private http: HttpClient) {
    // Cargar traducciones cuando cambia el idioma
    effect(() => {
      this.loadTranslations(this.currentLanguage());
      this.applyLanguage(this.currentLanguage());
      localStorage.setItem(this.STORAGE_KEY, this.currentLanguage());
    });
  }

  /**
   * Obtiene el idioma inicial (guardado o del sistema)
   */
  private getInitialLanguage(): Language {
    // Verificar si hay idioma guardado en localStorage
    const saved = localStorage.getItem(this.STORAGE_KEY) as Language | null;
    if (saved && (saved === 'es' || saved === 'en')) {
      return saved;
    }

    // Verificar preferencia del sistema
    const browserLang = navigator.language?.split('-')[0];
    if (browserLang === 'es') {
      return 'es';
    }

    return this.DEFAULT_LANGUAGE;
  }

  /**
   * Carga las traducciones del idioma especificado
   */
  private loadTranslations(language: Language): void {
    this.http
      .get<Translations>(`/assets/i18n/${language}.json`)
      .subscribe({
        next: (data) => {
          this.translations.set(data);
        },
        error: () => {
          console.error(`Failed to load translations for ${language}`);
          // Si falla, intentar cargar el idioma por defecto
          if (language !== this.DEFAULT_LANGUAGE) {
            this.http
              .get<Translations>(`/assets/i18n/${this.DEFAULT_LANGUAGE}.json`)
              .subscribe((data) => {
                this.translations.set(data);
              });
          }
        },
      });
  }

  /**
   * Aplica el idioma al documento HTML (para futuros usos de CSS o atributos)
   */
  private applyLanguage(language: Language): void {
    document.documentElement.lang = language;
  }

  /**
   * Cambia el idioma actual
   */
  setLanguage(language: Language): void {
    if (language !== this.currentLanguage()) {
      this.currentLanguage.set(language);
    }
  }

  /**
   * Alterna entre idiomas (español <-> inglés)
   */
  toggleLanguage(): void {
    const newLanguage = this.currentLanguage() === 'es' ? 'en' : 'es';
    this.setLanguage(newLanguage);
  }

  /**
   * Obtiene una traducción usando notación de punto (ej: "navbar.logout")
   */
  translate(key: string, defaultValue?: string): string {
    const keys = key.split('.');
    let value: any = this.translations();

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        return defaultValue || key;
      }
    }

    return typeof value === 'string' ? value : defaultValue || key;
  }

  /**
   * Obtiene todas las traducciones cargadas
   */
  getTranslations(): Translations {
    return this.translations();
  }

  /**
   * Obtiene el idioma actual
   */
  getCurrentLanguage(): Language {
    return this.currentLanguage();
  }

  /**
   * Obtiene los idiomas disponibles
   */
  getAvailableLanguages(): { code: Language; name: string }[] {
    return [
      { code: 'es', name: 'Español' },
      { code: 'en', name: 'English' },
    ];
  }
}
