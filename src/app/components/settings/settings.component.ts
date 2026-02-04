import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

interface Settings {
  language: 'es' | 'en';
  theme: 'light' | 'dark';
  currency: string;
  businessName: string;
  address: string;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    TranslatePipe,
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  languageService = inject(LanguageService);
  themeService = inject(ThemeService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  settings: Settings = {
    language: this.languageService.getCurrentLanguage(),
    theme: this.themeService.currentTheme() as 'light' | 'dark',
    currency: 'ARS',
    businessName: 'Mi Verdulería',
    address: 'Calle Principal 123',
    phone: '+54 9 11 1234-5678',
    email: 'info@miverdulersia.com',
  };

  availableLanguages = this.languageService.getAvailableLanguages();
  availableCurrencies = [
    { code: 'ARS', name: 'Peso Argentino (ARS)' },
    { code: 'USD', name: 'Dólar Estadounidense (USD)' },
    { code: 'EUR', name: 'Euro (EUR)' },
  ];

  /**
   * Cambia el idioma
   */
  onLanguageChange(language: 'es' | 'en'): void {
    this.languageService.setLanguage(language);
    this.settings.language = language;
  }

  /**
   * Cambia el tema
   */
  onThemeChange(isDarkTheme: boolean): void {
    const theme = isDarkTheme ? 'dark' : 'light';
    this.themeService.setTheme(theme as 'light' | 'dark');
    this.settings.theme = theme;
  }

  /**
   * Guarda la configuración
   */
  saveSettings(): void {
    // Guardar en localStorage
    localStorage.setItem('pdv-settings', JSON.stringify(this.settings));

    // Mostrar mensaje de éxito
    this.snackBar.open(
      this.languageService.translate('settings.saved'),
      this.languageService.translate('common.close'),
      {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
      }
    );
  }

  /**
   * Cancela y vuelve atrás
   */
  cancel(): void {
    this.router.navigate(['/']);
  }
}
