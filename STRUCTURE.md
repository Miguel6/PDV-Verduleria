# PDV Verdulería - Punto de Venta

Sistema de Punto de Venta (POS) moderno para verdulerías, desarrollado con **Angular 21** y **Material Design 3**, con soporte para **Electron** para aplicación de escritorio.

## 🚀 Características

### 📱 Pantalla POS (Principal)
- **Layout responsivo** (70% productos, 30% carrito)
- **Pestañas de categorías**: Frutas, Verduras, Ofertas, Varios
- **Buscador** de productos en tiempo real
- **Grilla de productos** con botones grandes y precio visible
- **Carrito de compras** con:
  - Edición de cantidad/peso
  - Edición de precio (admin)
  - Descuentos aplicables
  - Eliminación de items
- **Totales**: Subtotal, Descuento, Total
- **Acciones**: Cobrar, En espera, Cancelar venta

### 💳 Pantalla de Pago
- **Total bien grande** y visible
- **Métodos de pago**:
  - 💵 **Efectivo** - Con teclado numérico, cálculo de vuelto
  - 🏦 **Tarjeta** - Integración lista
  - 📱 **Mercado Pago** - Con QR
  - 🔄 **Mixto** - Combinación de métodos
- **Teclado numérico** personalizado para entrada rápida
- **Confirmación de pago** con guardado de venta

### ⚙️ Pantalla Admin
- **CRUD completo** de productos
- **Tabla editable** en línea
- **Agregar nuevo producto** con modal
- **Editar**: nombre, categoría, tipo (kg/unidad), precio
- **Eliminar** con confirmación

## 🛠️ Configuración

### Requisitos
- Node.js 18+
- npm 10+
- Angular 21
- Electron 40

### Instalación

```bash
# Clonar repositorio
git clone <repo-url>
cd PDV-Verduleria

# Instalar dependencias
npm install

# Angular Material y CDK ya están incluidos
```

## 📦 Scripts Disponibles

```bash
# Desarrollo - Servidor Angular
npm start

# Compilación producción
npm run build

# Watch mode (desarrollo)
npm run watch

# Pruebas
npm test

# Electron (cuando esté configurado)
npm run electron
```

## 🏗️ Estructura del Proyecto

```
src/app/
├── components/
│   ├── pos/                           # Pantalla de POS
│   │   ├── pos.component.ts
│   │   └── cart-item-editor/          # Editor de items del carrito
│   ├── payment/                       # Pantalla de Pago
│   │   └── payment.component.ts
│   ├── admin/                         # Pantalla Administrativa
│   │   └── admin.component.ts
│   ├── navbar/                        # Barra de navegación
│   │   └── navbar.component.ts
│   └── shared/                        # Componentes reutilizables
│       ├── numeric-keyboard/          # Teclado numérico
│       └── product-button/            # Botón de producto
├── services/
│   ├── product.service.ts            # Gestión de productos
│   ├── cart.service.ts               # Gestión del carrito
│   └── sales.service.ts              # Gestión de ventas
├── models/
│   ├── product.ts                    # Interfaces de producto
│   └── sale.ts                       # Interfaces de venta
└── app.routes.ts                     # Configuración de rutas
```

## 🎯 Funcionalidades Principales

### Gestión de Productos
- Almacenamiento en **signals** (Angular 21)
- Tipos: **kg** o **unidad**
- Categorización automática
- CRUD completo

### Carrito de Compras
- Suma automática de precios
- Descuentos aplicables
- Edición de cantidad/peso
- Eliminación de items

### Sistema de Pago
- **4 métodos de pago** principales
- Cálculo automático de vuelto
- Teclado numérico personalizado
- Historial de ventas

## 🎨 Diseño

### Material Design 3
- Tema principal: **Azul** (#2196F3)
- Paleta de colores profesional
- Componentes Material modernos
- Iconos Material Icons

### Responsive
- Diseño adaptable
- Optimizado para escritorio (Electron)
- Interfaz intuitiva

## 🔐 Características de Seguridad

- Roles de usuario (Admin/Vendedor) - Base preparada
- Edición de precios solo para admin
- Confirmación de operaciones críticas
- Validación de datos

## 📱 Rol del Usuario

- **Vendedor**: POS y Pago
- **Admin**: Además de vendedor, gestión de productos

## 🚀 Próximas Mejoras

- [ ] Integración real con API de pagos
- [ ] Base de datos persistente
- [ ] Reportes y estadísticas
- [ ] Sistema de usuarios con login
- [ ] Integración con Mercado Pago real
- [ ] Impresoras térmicas
- [ ] Código de barras QR
- [ ] Sincronización en nube

## 📄 Licencia

MIT

## 👨‍💻 Desarrollado con

- **Angular 21** - Framework
- **Angular Material 21** - Componentes UI
- **TypeScript 5.9** - Lenguaje
- **RxJS 7.8** - Reactividad
- **Electron 40** - Desktop (futuro)
- **SCSS** - Estilos

---

**Estado**: ✅ Alpha - Funcionalidad core completa, listo para uso inicial

