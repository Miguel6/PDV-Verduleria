import { Injectable, signal, computed } from '@angular/core';
import { Product, CartItem } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly products = signal<Product[]>([
    {
      id: '1',
      name: 'Manzanas',
      category: 'frutas',
      type: 'kg',
      price: 45,
      imageUrl: 'assets/products/manzanas.png',
    },
    {
      id: '2',
      name: 'Bananas',
      category: 'frutas',
      type: 'kg',
      price: 35,
      imageUrl: 'assets/products/bananas.png',
    },
    {
      id: '3',
      name: 'Tomates',
      category: 'verduras',
      type: 'kg',
      price: 50,
      imageUrl: 'assets/products/tomates.png',
    },
    {
      id: '4',
      name: 'Lechuga',
      category: 'verduras',
      type: 'unidad',
      price: 30,
      imageUrl: 'assets/products/lechuga.png',
    },
    {
      id: '5',
      name: 'Oferta Frutas Mix',
      category: 'ofertas',
      type: 'kg',
      price: 80,
      imageUrl: 'assets/products/frutas-mix.png',
    },
  ]);

  getAll = computed(() => this.products());
  getByCategory = (category: string) =>
    computed(() => this.products().filter(p => p.category === category));

  add(product: Product): void {
    this.products.update(products => [...products, product]);
  }

  update(id: string, product: Partial<Product>): void {
    this.products.update(products =>
      products.map(p => (p.id === id ? { ...p, ...product } : p))
    );
  }

  delete(id: string): void {
    this.products.update(products => products.filter(p => p.id !== id));
  }

  getById(id: string): Product | undefined {
    return this.products().find(p => p.id === id);
  }
}
