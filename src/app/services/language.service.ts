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
  
  // Signal para el idioma actual (este es el principal)
  currentLanguage = signal<Language>(this.getInitialLanguage());
  
  // Signal para las traducciones cargadas
  translations = signal<Translations>({});
  
  // Signal para track de si está cargando
  isLoading = signal<boolean>(false);

  constructor(private http: HttpClient) {
    // Effect que se dispara CADA VEZ que currentLanguage cambia
    effect(() => {
      const lang = this.currentLanguage();
      console.log('LanguageService: Cambio detectado a idioma:', lang);
      
      // Marcar como cargando
      this.isLoading.set(true);
      
      // Cargar traducciones
      this.loadTranslations(lang);
      
      // Aplicar idioma
      this.applyLanguage(lang);
      
      // Guardar en localStorage
      localStorage.setItem(this.STORAGE_KEY, lang);
    });

    // Cargar traducciones iniciales
    this.loadTranslations(this.currentLanguage());
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
    this.isLoading.set(true);
    
    this.http
      .get<Translations>(`/assets/i18n/${language}.json`)
      .subscribe({
        next: (data) => {
          console.log(`Traducciones cargadas para ${language}:`, data);
          this.translations.set(data);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error(`Error al cargar traducciones para ${language}:`, error);
          this.isLoading.set(false);
          
          // Si falla, intentar cargar el idioma por defecto
          if (language !== this.DEFAULT_LANGUAGE) {
            console.log(`Intentando cargar idioma por defecto: ${this.DEFAULT_LANGUAGE}`);
            this.http
              .get<Translations>(`/assets/i18n/${this.DEFAULT_LANGUAGE}.json`)
              .subscribe({
                next: (data) => {
                  console.log(`Traducciones por defecto cargadas:`, data);
                  this.translations.set(data);
                  this.isLoading.set(false);
                },
                error: (err) => {
                  console.error(`Error al cargar traducciones por defecto:`, err);
                  this.isLoading.set(false);
                },
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
    console.log(`Idioma del documento establecido a: ${language}`);
  }

  /**
   * Cambia el idioma actual - ESTE ES EL METODO CLAVE
   */
  setLanguage(language: Language): void {
    console.log(`setLanguage llamado con: ${language}, idioma actual: ${this.currentLanguage()}`);
    
    if (language !== this.currentLanguage()) {
      console.log(`Actualizando idioma de ${this.currentLanguage()} a ${language}`);
      this.currentLanguage.set(language);
    } else {
      console.log(`Idioma ya es ${language}, no hay cambio`);
    }
  }

  /**
   * Alterna entre idiomas (español <-> inglés)
   */
  toggleLanguage(): void {
    const newLanguage = this.currentLanguage() === 'es' ? 'en' : 'es';
    console.log(`Alternando idioma a: ${newLanguage}`);
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
        console.warn(`Traducción no encontrada: ${key}`);
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
