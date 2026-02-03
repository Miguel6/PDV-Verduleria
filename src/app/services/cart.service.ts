import { Injectable, signal, computed } from '@angular/core';
import { CartItem, Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly cartItems = signal<CartItem[]>([]);
  private readonly discountAmount = signal(0);

  items = computed(() => this.cartItems());
  discount = computed(() => this.discountAmount());

  subtotal = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.subtotal, 0)
  );

  total = computed(() => this.subtotal() - this.discount());

  addItem(product: Product, quantity: number = 1, weight?: number): void {
    const existing = this.cartItems().find(
      item => item.product.id === product.id && item.weight === weight
    );

    if (existing) {
      this.updateItemQuantity(product.id, existing.quantity + quantity, weight);
    } else {
      const subtotal = product.type === 'kg' && weight ? product.price * weight : product.price * quantity;
      this.cartItems.update(items => [
        ...items,
        { product, quantity, weight, subtotal },
      ]);
    }
  }

  updateItemQuantity(productId: string, quantity: number, weight?: number): void {
    this.cartItems.update(items =>
      items.map(item => {
        if (item.product.id === productId && item.weight === weight) {
          const subtotal =
            item.product.type === 'kg' && weight
              ? item.product.price * weight
              : item.product.price * quantity;
          return { ...item, quantity, subtotal };
        }
        return item;
      })
    );
  }

  updateItemPrice(productId: string, newPrice: number, weight?: number): void {
    this.cartItems.update(items =>
      items.map(item => {
        if (item.product.id === productId && item.weight === weight) {
          const quantity = item.weight ? item.weight : item.quantity;
          return {
            ...item,
            product: { ...item.product, price: newPrice },
            subtotal: newPrice * quantity,
          };
        }
        return item;
      })
    );
  }

  removeItem(productId: string, weight?: number): void {
    this.cartItems.update(items =>
      items.filter(item => !(item.product.id === productId && item.weight === weight))
    );
  }

  setDiscount(amount: number): void {
    this.discountAmount.set(Math.max(0, amount));
  }

  clear(): void {
    this.cartItems.set([]);
    this.discountAmount.set(0);
  }

  getItem(productId: string, weight?: number): CartItem | undefined {
    return this.cartItems().find(
      item => item.product.id === productId && item.weight === weight
    );
  }
}
