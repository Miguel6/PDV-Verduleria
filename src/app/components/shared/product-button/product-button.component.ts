import { Component, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-button',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatBadgeModule],
  templateUrl: './product-button.component.html',
  styleUrl: './product-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductButtonComponent {
  product = input.required<Product>();
  selected = input(false);
  isSelected = signal(false);

  onClick(): void {
    this.isSelected.update(v => !v);
  }
}
