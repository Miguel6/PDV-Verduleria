# Fase 5: Sistema de Configuración, Multilenguaje y Environments

## Resumen de Cambios

Se implementó un completo sistema de configuración con soporte multilenguaje, ambientes diferenciados (desarrollo/producción), y una pantalla de configuración para gestionar preferencias de la aplicación.

## Archivos Creados

### 1. Archivos de Ambientes

#### `/src/environments/environment.ts` (Desarrollo)
```typescript
{
  production: false,
  apiUrl: 'http://localhost:3000/api',
  apiTimeout: 30000,
  appVersion: '1.0.0'
}
```

#### `/src/environments/environment.prod.ts` (Producción)
```typescript
{
  production: true,
  apiUrl: 'https://api.verduleria.com/api',
  apiTimeout: 30000,
  appVersion: '1.0.0'
}
```

**Uso:** Importar `environment` según la configuración build de Angular
```typescript
import { environment } from '../environments/environment';
```

### 2. Archivos de Traducción (i18n)

#### `/src/assets/i18n/es.json`
- Traducción completa al español
- Categorías: app, navbar, pos, payment, admin, settings, common
- 50+ cadenas de traducción

#### `/src/assets/i18n/en.json`
- Traducción completa al inglés
- Misma estructura que es.json
- 50+ cadenas de traducción

**Estructura de claves:**
```
{
  "seccion": {
    "clave": "valor de traducción"
  }
}
```

**Ejemplo de uso:**
```
navbar.logout → "Cerrar Sesión" (es) / "Logout" (en)
settings.language → "Idioma" (es) / "Language" (en)
```

### 3. Servicio de Idiomas (LanguageService)

#### `/src/app/services/language.service.ts`

**Características principales:**

- **Gestión de estado con Signals:**
  - `currentLanguage`: Signal reactiva del idioma actual
  - `translations`: Signal con las traducciones cargadas

- **Métodos principales:**
  - `setLanguage(language)`: Cambia el idioma
  - `toggleLanguage()`: Alterna entre español e inglés
  - `translate(key, defaultValue)`: Obtiene traducción por clave
  - `getCurrentLanguage()`: Retorna el idioma actual
  - `getAvailableLanguages()`: Lista idiomas disponibles

- **Persistencia:**
  - localStorage con clave `pdv-language`
  - Detección automática de preferencia del sistema

- **Carga dinámica:**
  - Carga archivos JSON desde `/assets/i18n/`
  - HttpClient para solicitudes HTTP

**Ejemplo de uso:**
```typescript
constructor(private languageService: LanguageService) {}

// Cambiar idioma
this.languageService.setLanguage('en');

// Obtener traducción
const titulo = this.languageService.translate('navbar.logout');

// Alternar idioma
this.languageService.toggleLanguage();

// Obtener idioma actual
const lang = this.languageService.getCurrentLanguage(); // 'es' | 'en'
```

### 4. Componente de Configuración

#### `/src/app/components/settings/settings.component.ts`
- Componente standalone de Material Design
- ChangeDetectionStrategy.OnPush

**Funcionalidades:**
- Selector de idioma con lista desplegable
- Toggle de tema (claro/oscuro)
- Selector de moneda (ARS, USD, EUR)
- Formulario de información del negocio
  - Nombre del negocio
  - Dirección
  - Teléfono
  - Email
- Persistencia de configuración en localStorage
- Notificaciones con Snackbar

#### `/src/app/components/settings/settings.component.html`
- Interfaz responsive con Material Cards
- Formularios con validación
- Botones de guardar y cancelar
- Navegación de regreso

#### `/src/app/components/settings/settings.component.scss`
- Estilos con variables CSS (tema claro/oscuro)
- Layout flexbox adaptable
- Responsive para móviles
- Tema 100% sincronizado con la aplicación

## Archivos Modificados

### 1. Angular Router (`/src/app/app.routes.ts`)
```typescript
// Nueva ruta agregada
{ path: 'configuracion', component: SettingsComponent }
```

### 2. Navbar Component

#### `navbar.component.ts`
- Inyectado LanguageService
- Agregado método `toggleLanguage()`
- Agregado método `navigateToSettings()`
- Agregado método `translate(key)`

#### `navbar.component.html`
- Botón de idioma con código de idioma visible (ES/EN)
- Botón de configuración
- Título dinámico con traducción
- Integración completa con traducción

#### `navbar.component.scss`
- Estilos para botón de idioma
- Animaciones hover
- Responsive design

### 3. Componente Root (`/src/app/app.ts`)
- Inyectado LanguageService
- Inicialización automática de idiomas
- Effect para reactividad

### 4. Angular Configuration (`/angular.json`)
```json
"assets": [
  {
    "glob": "**/*.json",
    "input": "src/assets/i18n",
    "output": "/assets/i18n"
  }
]
```

## Estructura de Carpetas

```
src/
├── environments/
│   ├── environment.ts         ← Desarrollo
│   └── environment.prod.ts    ← Producción
├── assets/
│   └── i18n/
│       ├── es.json           ← Traducciones español
│       └── en.json           ← Traducciones inglés
├── app/
│   ├── services/
│   │   ├── language.service.ts  ← NUEVO
│   │   ├── theme.service.ts
│   │   ├── cart.service.ts
│   │   ├── product.service.ts
│   │   └── sales.service.ts
│   └── components/
│       ├── settings/            ← NUEVO
│       │   ├── settings.component.ts
│       │   ├── settings.component.html
│       │   └── settings.component.scss
│       ├── navbar/
│       ├── pos/
│       ├── payment/
│       ├── admin/
│       └── ...
```

## Características de Traducción

### Cobertura
- ✅ Navegación (navbar)
- ✅ Punto de venta (POS)
- ✅ Pagos
- ✅ Administración
- ✅ Configuración
- ✅ Términos comunes

### Idiomas Soportados
1. **Español (es)** - Por defecto
2. **Inglés (en)**

### Persistencia
- Idioma guardado en localStorage
- Preferencia del navegador detectada automáticamente
- Fallback a español si no hay preferencia

## Características de Ambiente

### Desarrollo
- `apiUrl: http://localhost:3000/api`
- `production: false`
- Ideal para desarrollo local

### Producción
- `apiUrl: https://api.verduleria.com/api`
- `production: true`
- Optimizado para deployment

### Configuración
```bash
# Desarrollo
ng serve

# Producción
ng build --configuration production
```

## Flujo de Uso

### Cambiar Idioma
1. Click en botón de idioma (ES/EN) en navbar
2. LanguageService detecta cambio
3. Traducciones se cargan automáticamente
4. localStorage se actualiza
5. Aplicación reactiva con Signals

### Acceder a Configuración
1. Click en icono de engranaje (⚙️) en navbar
2. Navega a ruta `/configuracion`
3. Muestra componente SettingsComponent
4. Permite cambiar idioma, tema, datos del negocio
5. Guardar persiste en localStorage

## Integración con Existentes

### Navbar
```typescript
// Acceder traducciones en template
{{ translate('navbar.logout') }}

// Cambiar idioma desde template
(click)="toggleLanguage()"
```

### Componente Root
```typescript
// LanguageService inyectado en App
private languageService = inject(LanguageService);
```

### Rutas
```typescript
// Nuevas rutas disponibles
/configuracion - Pantalla de configuración
```

## Consideraciones de Rendimiento

✅ **Lazy Loading de Traducciones**
- HttpClient carga JSON solo cuando se necesita

✅ **Signals para Reactividad**
- Cambios reactivos sin RxJS overhead

✅ **localStorage para Persistencia**
- Evita recargar traducciones en cada visita

✅ **OnPush Change Detection**
- Optimizacion en SettingsComponent

## Testing

### URLs de Test

**Desarrollo:**
```
http://localhost:4200
http://localhost:4200/configuracion
```

**Verificar idiomas:**
- Navbar: botón ES/EN
- Settings: selector de idioma
- localStorage: `pdv-language` key

**Verificar ambientes:**
- Ver network en DevTools
- Development: `localhost:3000`
- Production: `https://api.verduleria.com`

## Estado de la Compilación

✅ **Build exitoso** - 799.79 kB
- Sin errores de compilación
- Todos los archivos de traducción incluidos
- Rutas registradas correctamente
- Services inyectados apropiadamente

## Próximos Pasos Sugeridos

1. Integrar API real con environment.apiUrl
2. Agregar más idiomas (portugués, francés, etc.)
3. Crear interceptor HTTP para usar apiUrl
4. Agregar traducción de mensajes de error
5. Implementar RTL (Right-to-Left) para árabe
