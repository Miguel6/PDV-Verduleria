# 🔧 Documentación Técnica - PDV Verdulería

## Arquitectura

### Stack Tecnológico
```
Frontend:  Angular 21 + Material 3 + TypeScript 5.9
Backend:   Signals (State Management Local)
Desktop:   Electron 40 (preparado)
Estilos:   SCSS + Material Theming
```

### Patrones de Diseño

#### 1. **Componentes Standalone**
Todos los componentes usan `standalone: true` sin NgModules:
```typescript
@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [CommonModule, FormsModule, ...]
})
export class PosComponent {}
```

#### 2. **Signals para State Management**
Reemplazan a BehaviorSubject/Observable para estado local:
```typescript
private cartItems = signal<CartItem[]>([]);
items = computed(() => this.cartItems());
addItem(product) {
  this.cartItems.update(items => [...items, product]);
}
```

#### 3. **Inyección de Dependencias**
```typescript
private productService = inject(ProductService);
private router = inject(Router);
```

#### 4. **Control de Cambios OnPush**
Optimización de performance:
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

#### 5. **Reactive Forms** (cuando se necesita)
En admin, se usan inputs simples pero preparado para FormBuilder:
```typescript
private fb = inject(FormBuilder);
```

---

## Servicios

### ProductService
**Responsabilidad**: Gestión de catálogo de productos

```typescript
// Métodos principales
getAll()              // Retorna todos los productos
getByCategory(cat)    // Retorna productos por categoría
getById(id)          // Busca un producto
add(product)         // Agrega nuevo producto
update(id, data)     // Actualiza un producto
delete(id)           // Elimina un producto

// State
private products = signal<Product[]>([]);
```

**Storage**: En memoria (signals)
**Persistencia**: Futura integración con base de datos

### CartService
**Responsabilidad**: Gestión del carrito de compras

```typescript
// Métodos principales
addItem(product, qty, weight?)      // Agrega item al carrito
updateItemQuantity(id, qty, weight) // Actualiza cantidad
updateItemPrice(id, price, weight)  // Edita precio (admin)
removeItem(id, weight)              // Elimina item
setDiscount(amount)                 // Aplica descuento
clear()                             // Vacía el carrito

// Computed properties
items         // Array de items
subtotal      // Total sin descuento
total         // Total con descuento aplicado
discount      // Monto de descuento
```

**Lógica especial**:
- Items con peso (kg) se identifican por producto + peso
- Items duplicados se agrupan (aumenta cantidad)
- Precios se recalculan con weight en kg

### SalesService
**Responsabilidad**: Registro y almacenamiento de ventas

```typescript
// Métodos
saveSale(sale)  // Guarda una venta
getSales()      // Retorna historial

// Genera ID: SALE-{timestamp}-{random}
```

**Futura mejora**: Sincronización con backend

---

## Modelos de Datos

### Product Interface
```typescript
interface Product {
  id: string;
  name: string;
  category: 'frutas' | 'verduras' | 'ofertas' | 'varios';
  type: 'kg' | 'unidad';
  price: number;
  imageUrl?: string;
}
```

### CartItem Interface
```typescript
interface CartItem {
  product: Product;
  quantity: number;
  weight?: number;      // Solo para tipo 'kg'
  subtotal: number;     // Calculado automáticamente
}
```

### Sale Interface
```typescript
interface Sale {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: 'efectivo' | 'tarjeta' | 'mercadopago' | 'mixto';
  paymentDetails?: {
    cash?: number;
    card?: number;
    mercadopago?: number;
    change?: number;
  };
  timestamp: Date;
}
```

---

## Componentes

### PosComponent
**Ruta**: `/`
**Responsabilidad**: Interfaz principal de venta

**Props Principales**:
- `searchTerm`: Signal para búsqueda
- `selectedProduct`: Producto seleccionado actual
- `selectedCartItem`: Item del carrito siendo editado

**Métodos Clave**:
- `getProductsByCategory()`: Filtra por categoría
- `selectProduct()`: Agrega al carrito
- `selectCartItem()`: Abre editor
- `removeFromCart()`: Elimina item
- `goToPayment()`: Navega a pago

### PaymentComponent
**Ruta**: `/pago`
**Responsabilidad**: Procesamiento de pagos

**Props Principales**:
- `paymentMethod`: Método seleccionado
- `effectiveAmount`: Monto recibido (efectivo)
- `mixed*`: Desglose de pago mixto

**Métodos Clave**:
- `selectPaymentMethod()`: Cambia método
- `calculateChange()`: Calcula vuelto
- `confirmPayment()`: Finaliza venta
- `getTotalMixedAmount()`: Suma pagos mixtos

### AdminComponent
**Ruta**: `/admin`
**Responsabilidad**: Gestión de productos

**Props Principales**:
- `showNewProductForm`: Modal de nuevo producto
- `editingId`: ID del producto en edición
- `newProduct`: Datos del producto nuevo
- `editForm`: Datos del producto en edición

**Métodos Clave**:
- `openNewProductForm()`: Abre modal
- `saveNewProduct()`: Guarda nuevo producto
- `editProduct()`: Inicia edición
- `saveEdit()`: Confirma cambios
- `deleteProduct()`: Elimina producto

### NumericKeyboardComponent
**Ruta**: Compartido
**Responsabilidad**: Teclado numérico personalizado

**Output**:
- `valueChange`: Emite número confirmado

### CartItemEditorComponent
**Ruta**: Dentro de PosComponent
**Responsabilidad**: Edición de items del carrito

**Inputs**:
- `item`: CartItem a editar

**Outputs**:
- `quantityChange`: Cambio de cantidad/peso
- `priceChange`: Cambio de precio
- `close`: Cierre del editor

---

## Rutas

```typescript
const routes: Routes = [
  { path: '', component: PosComponent },          // Principal
  { path: 'pago', component: PaymentComponent },  // Pago
  { path: 'admin', component: AdminComponent },   // Administración
  { path: '**', redirectTo: '' }                  // 404
];
```

---

## Material Design Integration

### Módulos Importados
```typescript
// Componentes
MatTabsModule          // Categorías
MatInputModule         // Inputs
MatButtonModule        // Botones
MatIconModule          // Iconos
MatListModule          // Listas
MatDividerModule       // Divisores
MatFormFieldModule     // Campos de formulario
MatSelectModule        // Selects
MatTableModule         // Tabla admin
MatToolbarModule       // Navbar
MatBadgeModule         // Badges
MatCardModule          // Cards
MatDialog              // Modales (preparado)
```

### Tema
**Color primario**: mat.$azure-palette (#2196F3)
**Tipografía**: Roboto
**Tema**: Light
**Sistema de variables CSS**: Material 3

---

## Validaciones y Seguridad

### Validaciones Implementadas
- ✅ Producto válido antes de agregar al carrito
- ✅ Cantidad >= 1
- ✅ Peso >= 0.1 kg
- ✅ Precio > 0
- ✅ Descuento >= 0
- ✅ Suma de pago mixto >= total

### Preparación para Futuro
- Roles de usuario (admin/vendedor)
- Autenticación (sin implementar aún)
- Autorización en métodos sensibles

---

## Performance

### Optimizaciones
1. **ChangeDetectionStrategy.OnPush** en todos los componentes
2. **Signals** para reactividad eficiente
3. **Computed** para derivados evitando cálculos duplicados
4. **TrackBy** en *ngFor (control flujo)
5. **Lazy Loading** de rutas (estructura preparada)

### Memory Management
- Signals se limpian automáticamente
- No hay memory leaks de subscriptions (no usamos observables)
- Componentes standalone sin providers globales innecesarios

---

## Próximas Implementaciones

### Backend
```typescript
// Próximo: HttpClient integration
constructor(private http = inject(HttpClient)) {}

// Endpoints necesarios
GET    /api/products
POST   /api/products
PATCH  /api/products/:id
DELETE /api/products/:id
POST   /api/sales
GET    /api/sales
```

### Base de Datos
```typescript
// PostgreSQL / MongoDB
interface DatabaseProduct extends Product {
  createdAt: Date;
  updatedAt: Date;
}
```

### Autenticación
```typescript
// Futura: JWT + Guards
export class AuthGuard implements CanActivate {}
export class AdminGuard implements CanActivate {}
```

### Reportes
```typescript
// Futura: GenerateReportService
generateSalesReport(from: Date, to: Date)
generateProductReport()
exportToCSV()
```

---

## Variables de Entorno

Próximamente:
```env
API_URL=http://localhost:3000
API_KEY=xxxx
MERCADO_PAGO_KEY=xxxx
```

---

## Testing

**Framework**: Vitest (Jasmine también disponible)
**Coverage Target**: 80%

```bash
npm test                    # Corre tests
npm test -- --coverage     # Con coverage
```

---

## Deployment

### Electron (Desktop)
```bash
npm run electron
npm run electron:build
```

### Web
```bash
npm run build
# Servir desde dist/pdv-verduleria
```

### Docker (próximo)
```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 4200
CMD ["npm", "start"]
```

---

## Resolución de Problemas

### Error: "Cannot find name 'cartService'"
- Asegúrate de inyectarlo: `private cartService = inject(CartService);`

### Signals no se actualizan en template
- Usa `()` para acceder: `cartService.total()`

### Input two-way binding error
- Usa `[value]` + `(change)` en lugar de `[(ngModel)]`

---

## Contacto y Soporte

Para reportar bugs o sugerencias:
- GitHub: [Crear issue]
- Email: desarrollo@pdv-verduleria.local

---

**Última actualización**: 2026-02-02
**Versión**: 1.0.0-alpha
