import { Injectable, signal } from '@angular/core';
import { Sale } from '../models/sale';

@Injectable({ providedIn: 'root' })
export class SalesService {
  private readonly sales = signal<Sale[]>([]);

  getSales = () => this.sales();

  saveSale(sale: Sale): void {
    this.sales.update(sales => [...sales, { ...sale, id: this.generateId() }]);
    console.log('Sale saved:', sale);
  }

  private generateId(): string {
    return `SALE-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
