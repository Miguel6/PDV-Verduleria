import { Component, input, output, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart-item-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
  ],
  templateUrl: './cart-item-editor.component.html',
  styleUrl: './cart-item-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemEditorComponent implements OnInit {
  item = input.required<any>();
  quantityChange = output<number>();
  priceChange = output<number>();
  close = output<void>();

  quantity = signal(1);
  weight = signal(0);
  price = signal(0);

  ngOnInit(): void {
    const cartItem = this.item();
    if (cartItem.product.type === 'kg') {
      this.weight.set(cartItem.weight || 1);
    } else {
      this.quantity.set(cartItem.quantity || 1);
    }
    this.price.set(cartItem.product.price);
  }

  get subtotal(): number {
    if (this.item().product.type === 'kg') {
      return this.price() * this.weight();
    }
    return this.price() * this.quantity();
  }

  increaseQuantity(): void {
    this.quantity.update(q => q + 1);
    this.quantityChange.emit(this.quantity());
  }

  decreaseQuantity(): void {
    this.quantity.update(q => Math.max(1, q - 1));
    this.quantityChange.emit(this.quantity());
  }

  increaseWeight(): void {
    this.weight.update(w => w + 0.1);
    this.quantityChange.emit(this.weight());
  }

  decreaseWeight(): void {
    this.weight.update(w => Math.max(0.1, w - 0.1));
    this.quantityChange.emit(this.weight());
  }

  onConfirm(): void {
    this.priceChange.emit(this.price());
    this.onClose();
  }

  onClose(): void {
    this.close.emit();
  }
}
