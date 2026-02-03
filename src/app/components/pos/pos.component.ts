import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';
import { ProductButtonComponent } from '../shared/product-button/product-button.component';
import { CartItemEditorComponent } from './cart-item-editor/cart-item-editor.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatFormFieldModule,
    ProductButtonComponent,
    CartItemEditorComponent,
  ],
  templateUrl: './pos.component.html',
  styleUrl: './pos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PosComponent {
  private productService = inject(ProductService);
  private router = inject(Router);
  cartService = inject(CartService);

  searchTerm = signal('');
  selectedProduct = signal<Product | null>(null);
  selectedCartItem = signal<any>(null);

  getProductsByCategory(category: string): Product[] {
    return this.productService.getAll().filter(p => p.category === category);
  }

  selectProduct(product: Product): void {
    this.selectedProduct.set(product);
    this.cartService.addItem(product);
  }

  selectCartItem(item: any): void {
    this.selectedCartItem.set(item);
  }

  onQuantityChange(quantity: number): void {
    if (this.selectedCartItem()) {
      const item = this.selectedCartItem();
      this.cartService.updateItemQuantity(item.product.id, quantity, item.weight);
    }
  }

  onPriceChange(newPrice: number): void {
    if (this.selectedCartItem()) {
      const item = this.selectedCartItem();
      this.cartService.updateItemPrice(item.product.id, newPrice, item.weight);
    }
  }

  removeFromCart(item: any): void {
    this.cartService.removeItem(item.product.id, item.weight);
  }

  setDiscount(event: any): void {
    const value = parseFloat(event.target.value) || 0;
    this.cartService.setDiscount(value);
  }

  goToPayment(): void {
    if (this.cartService.items().length > 0) {
      this.router.navigate(['/pago']);
    }
  }

  cancelSale(): void {
    if (confirm('¿Cancelar la venta?')) {
      this.cartService.clear();
      this.selectedCartItem.set(null);
    }
  }
}
