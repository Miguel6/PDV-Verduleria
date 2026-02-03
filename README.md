# 🍅 PDV Verdulería - Punto de Venta Moderno

Sistema de **Punto de Venta (POS)** profesional y moderno para verdulerías, desarrollado con **Angular 21**, **Material Design 3** y preparado para **Electron** en escritorio.

## ✨ Características Principales

### 📱 Interfaz Intuitiva
- Diseño responsivo con layout 70/30 (productos/carrito)
- Categorías de productos (Frutas, Verduras, Ofertas, Varios)
- Teclado numérico personalizado para entrada rápida
- Íconos Material Design intuitivos

### 💳 Sistema de Pago Completo
- **Efectivo** con cálculo automático de vuelto
- **Tarjeta** de crédito/débito
- **Mercado Pago** con código QR
- **Mixto** - Combinación de métodos

### 🛍️ Gestión de Carrito
- Agregar/quitar productos
- Editar cantidad y peso (kg)
- Editar precios (admin)
- Aplicar descuentos
- Subtotal/Total automático

### ⚙️ Administración Completa
- CRUD de productos
- Gestión de categorías
- Edición en línea
- Modal para nuevos productos

---

## 🚀 Quick Start

### 1. Instalación
```bash
# Clonar repositorio
git clone <repo-url>
cd PDV-Verduleria

# Instalar dependencias
npm install
```

### 2. Desarrollo
```bash
# Iniciar servidor de desarrollo
npm start

# Acceder en: http://localhost:4200
```

### 3. Compilación
```bash
# Build para producción
npm run build

# Watch mode (desarrollo con auto-reload)
npm run watch

# Tests
npm test
```

---

## 📁 Estructura del Proyecto

```
PDV-Verduleria/
├── src/app/
│   ├── components/
│   │   ├── pos/                    # Pantalla POS principal
│   │   ├── payment/                # Pantalla de pago
│   │   ├── admin/                  # Panel administrativo
│   │   ├── navbar/                 # Barra de navegación
│   │   └── shared/                 # Componentes reutilizables
│   ├── services/
│   │   ├── product.service.ts      # Gestión de productos
│   │   ├── cart.service.ts         # Gestión de carrito
│   │   └── sales.service.ts        # Almacenamiento de ventas
│   ├── models/
│   │   ├── product.ts              # Interfaz de producto
│   │   └── sale.ts                 # Interfaz de venta
│   ├── app.routes.ts               # Rutas
│   ├── app.config.ts               # Configuración
│   ├── app.ts                      # Componente raíz
│   └── app.scss                    # Estilos globales
├── public/                         # Assets estáticos
├── GUIA_USO.md                     # 📖 Guía de usuario
├── STRUCTURE.md                    # 🏗️ Estructura detallada
├── TECH_DOCS.md                    # 🔧 Documentación técnica
└── README.md                       # Este archivo
```

---

## 📖 Documentación

### Para Usuarios
👉 [**GUIA_USO.md**](./GUIA_USO.md) - Cómo usar la aplicación paso a paso

### Para Desarrolladores
👉 [**TECH_DOCS.md**](./TECH_DOCS.md) - Arquitectura, servicios, componentes
👉 [**STRUCTURE.md**](./STRUCTURE.md) - Estructura y características técnicas

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| **Framework** | Angular | 21.1.0 |
| **UI** | Angular Material | 21.1.2 |
| **Lenguaje** | TypeScript | 5.9.2 |
| **State** | Angular Signals | Built-in |
| **Estilos** | SCSS | Built-in |
| **Desktop** | Electron | 40.1.0 |
| **Testing** | Vitest/Jasmine | 4.0.8 |

---

## 🎯 Pantallas Principales

### 1. POS (Punto de Venta)
- Catálogo de productos con búsqueda
- Carrito en tiempo real
- Editor de items (cantidad, peso, precio)
- Totales y descuentos

### 2. Pago
- Selector de método de pago
- Entrada numérica optimizada
- Cálculo automático de vuelto
- Confirmación de transacción

### 3. Admin
- Tabla de productos
- Agregar/editar/eliminar productos
- Edición en línea
- Modal para nuevos productos

---

## 🎨 Temas y Personalización

### Material Design 3
```scss
// Colores principales
--primary-color: #2196f3;     // Azul
--accent-color: #ff4081;      // Rosa
--warn-color: #f44336;        // Rojo
--success-color: #4caf50;     // Verde
```

### Personalización
- Editar `src/styles.scss` para tema global
- Editar `src/app/app.scss` para estilos de componentes

---

## 🔐 Características de Seguridad

✅ Validación de datos en entrada
✅ Confirmación de operaciones críticas
✅ Preparación para roles de usuario (admin/vendedor)
✅ Estructura lista para autenticación

---

## 📊 State Management

### Signals (Angular 21)
```typescript
// En lugar de BehaviorSubject/Observable
const items = signal<CartItem[]>([]);
const total = computed(() => items().reduce(...));
```

### Beneficios
- ✅ Mejor performance
- ✅ Sintaxis más limpia
- ✅ Menos boilerplate
- ✅ Reactividad granular

---

## 🚀 Deployment

### Web (Browser)
```bash
npm run build
# Servir desde: dist/pdv-verduleria/browser
```

### Desktop (Electron) - Próximo
```bash
npm run electron
npm run electron:build
```

### Docker - Próximo
```dockerfile
# En desarrollo
```

---

## 📋 Requisitos Previos

- **Node.js** 18+
- **npm** 10+
- **Navegador moderno** (Chrome, Edge, Firefox)
- **Sistema operativo**: Windows, macOS, Linux

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/amazing`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing`)
5. Abre un Pull Request

---

## 📝 Próximas Mejoras

- [ ] Integración con API real
- [ ] Base de datos persistente
- [ ] Sistema de reportes
- [ ] Autenticación y roles
- [ ] Integración Mercado Pago real
- [ ] Impresoras térmicas
- [ ] Códigos QR/Código de barras
- [ ] Sincronización en nube
- [ ] App móvil (React Native)

---

## ❓ FAQ

**P: ¿Es gratuito?**
R: Sí, código abierto bajo licencia MIT.

**P: ¿Puedo usarlo en producción?**
R: Es versión Alpha. Recomendamos testing antes de usar en producción.

**P: ¿Necesita internet?**
R: No, funciona completamente offline. Para integraciones futuras sí.

**P: ¿Cómo reporto bugs?**
R: Crea un issue en GitHub o contacta al equipo de desarrollo.

---

## 📞 Soporte

- 📧 Email: [soporte@pdv-verduleria.local](mailto:soporte@pdv-verduleria.local)
- 💬 Discord: [Enlace a servidor]
- 📱 WhatsApp: [Número de contacto]

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Ver [LICENSE](./LICENSE) para más detalles.

---

## 👨‍💻 Autores

- **Miguel Ángel Mengual** - Desarrollo inicial
- **Comunidad** - Contribuciones y feedback

---

## 🙏 Agradecimientos

- [Angular Team](https://angular.io)
- [Material Design](https://material.angular.io)
- [Electron](https://www.electronjs.org)
- Comunidad de desarrolladores

---

**Última actualización**: 2026-02-02  
**Versión actual**: 1.0.0-alpha  
**Estado**: ✅ Funcionalidad core completa, listo para uso inicial

---

### 🎉 ¡Gracias por usar PDV Verdulería!

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
