import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  productService = inject(ProductService);

  showNewProductForm = signal(false);
  editingId = signal<string | null>(null);

  newProduct = {
    name: '',
    category: 'frutas' as 'frutas' | 'verduras' | 'ofertas' | 'varios',
    type: 'kg' as 'kg' | 'unidad',
    price: 0,
  };

  editForm = {
    name: '',
    category: 'frutas' as 'frutas' | 'verduras' | 'ofertas' | 'varios',
    type: 'kg' as 'kg' | 'unidad',
    price: 0,
  };

  openNewProductForm(): void {
    this.showNewProductForm.set(true);
  }

  closeNewProductForm(): void {
    this.showNewProductForm.set(false);
    this.resetNewProductForm();
  }

  saveNewProduct(): void {
    if (this.newProduct.name && this.newProduct.price > 0) {
      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        name: this.newProduct.name,
        category: this.newProduct.category,
        type: this.newProduct.type,
        price: this.newProduct.price,
      };
      this.productService.add(newProduct);
      this.closeNewProductForm();
    }
  }

  editProduct(product: Product): void {
    this.editingId.set(product.id);
    this.editForm = { ...product };
  }

  saveEdit(product: Product): void {
    this.productService.update(product.id, {
      name: this.editForm.name,
      category: this.editForm.category,
      type: this.editForm.type,
      price: this.editForm.price,
    });
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.editingId.set(null);
  }

  deleteProduct(id: string): void {
    if (confirm('¿Eliminar este producto?')) {
      this.productService.delete(id);
    }
  }

  private resetNewProductForm(): void {
    this.newProduct = {
      name: '',
      category: 'frutas',
      type: 'kg',
      price: 0,
    };
  }

  parseFloat(value: string): number {
    return parseFloat(value) || 0;
  }

  parseString(value: any): string {
    return String(value || '');
  }
}
