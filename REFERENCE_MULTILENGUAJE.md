// Quick Reference Guide - Multilenguaje y Configuración

// ============================================
// 1. USAR TRADUCCIÓN EN COMPONENTES
// ============================================

// En TypeScript:
export class MiComponente {
  constructor(private languageService: LanguageService) {}

  obtenerTexto(): string {
    return this.languageService.translate('navbar.logout');
  }

  cambiarIdioma(): void {
    this.languageService.setLanguage('en');
  }

  alternarIdioma(): void {
    this.languageService.toggleLanguage();
  }

  obtenerIdiomaActual(): string {
    return this.languageService.getCurrentLanguage(); // 'es' | 'en'
  }
}

// En Templates:
/*
<button>{{ languageService.translate('navbar.logout') }}</button>
<p>{{ translate('settings.title') }}</p>
*/

// ============================================
// 2. AÑADIR NUEVAS TRADUCCIONES
// ============================================

// 1. Editar /src/assets/i18n/es.json
{
  "nueva_seccion": {
    "nueva_clave": "Valor en español"
  }
}

// 2. Editar /src/assets/i18n/en.json
{
  "nueva_seccion": {
    "nueva_clave": "Value in English"
  }
}

// 3. Usar en componente:
this.languageService.translate('nueva_seccion.nueva_clave')

// ============================================
// 3. USAR ENVIRONMENT VARIABLES
// ============================================

import { environment } from '../environments/environment';

// En cualquier parte de la app:
console.log(environment.apiUrl);      // http://localhost:3000/api (dev) o https://api.verduleria.com/api (prod)
console.log(environment.production);  // false (dev) o true (prod)

// En servicio HTTP:
constructor(private http: HttpClient) {}

obtenerProductos(): Observable<any> {
  return this.http.get(`${environment.apiUrl}/productos`);
}

// ============================================
// 4. CREAR NUEVO COMPONENTE CON TRADUCCIÓN
// ============================================

// en mi-componente.component.ts:
@Component({
  selector: 'app-mi-componente',
  template: `<h1>{{ translate('mi_seccion.titulo') }}</h1>`,
})
export class MiComponenteComponent {
  constructor(private languageService: LanguageService) {}

  translate(key: string): string {
    return this.languageService.translate(key);
  }
}

// ============================================
// 5. PERSISTENCIA Y DETECCIÓN
// ============================================

// El LanguageService automáticamente:
// ✓ Guarda selección en localStorage (pdv-language)
// ✓ Detecta idioma del navegador en primera visita
// ✓ Carga traducciones de /assets/i18n/{lang}.json
// ✓ Establece atributo lang en <html>

// ============================================
// 6. RUTAS DISPONIBLES
// ============================================

// / → POS
// /pago → Payment
// /admin → Admin
// /configuracion → Settings (NUEVA)

// ============================================
// 7. FLUJO DE IDIOMAS
// ============================================

// 1. User abre app
//    ↓
// 2. LanguageService detecta idioma (localStorage, navegador o 'es')
//    ↓
// 3. HttpClient carga es.json o en.json
//    ↓
// 4. Translations signal se actualiza
//    ↓
// 5. Templates reaccionan automáticamente
//    ↓
// 6. User cambia idioma en navbar
//    ↓
// 7. LanguageService.toggleLanguage() → carga nuevo JSON
//    ↓
// 8. localStorage se actualiza
//    ↓
// 9. Ciclo repite

// ============================================
// 8. ESTRUCTURA DE JSON DE TRADUCCIÓN
// ============================================

/*
{
  "seccion": {
    "subseccion": {
      "clave": "valor"
    }
  }
}

Acceso: languageService.translate('seccion.subseccion.clave')
*/

// ============================================
// 9. SETTINGS COMPONENT FEATURES
// ============================================

/*
✓ Selector de idioma
✓ Toggle de tema (claro/oscuro)
✓ Selector de moneda (ARS/USD/EUR)
✓ Datos del negocio (nombre, dirección, teléfono, email)
✓ Guardar cambios en localStorage
✓ Snackbar notifications
✓ Responsive design
✓ Navegación atrás
*/

// ============================================
// 10. COMPILAR PARA PRODUCCIÓN
// ============================================

// npm run build

// Resultado:
// - API URL: https://api.verduleria.com/api
// - Traducciones: Incluidas en assets
// - Tema: Compatible con selección
// - Responsive: Optimizado para todos los dispositivos
