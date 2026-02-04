import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  private languageService = inject(LanguageService);

  transform(key: string, defaultValue?: string): string {
    // Acceder al signal para asegurar reactividad
    // Cada cambio en currentLanguage o translations dispara una actualización
    this.languageService.currentLanguage();
    this.languageService.translations();
    
    return this.languageService.translate(key, defaultValue);
  }
}
