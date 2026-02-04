import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CartService } from '../../services/cart.service';
import { SalesService } from '../../services/sales.service';
import { NumericKeyboardComponent } from '../shared/numeric-keyboard/numeric-keyboard.component';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    NumericKeyboardComponent,
    TranslatePipe,
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentComponent {
  private router = inject(Router);
  cartService = inject(CartService);
  private salesService = inject(SalesService);

  paymentMethod = signal<'efectivo' | 'tarjeta' | 'mercadopago' | 'mixto'>('efectivo');
  effectiveAmount = signal(0);
  mixedCash = signal(0);
  mixedCard = signal(0);
  mixedMercadopago = signal(0);

  selectPaymentMethod(method: 'efectivo' | 'tarjeta' | 'mercadopago' | 'mixto'): void {
    this.paymentMethod.set(method);
  }

  calculateChange(): number {
    const total = this.cartService.total();
    return Math.max(0, this.effectiveAmount() - total);
  }

  getTotalMixedAmount(): number {
    return this.mixedCash() + this.mixedCard() + this.mixedMercadopago();
  }

  onKeyboardValue(value: number): void {
    this.effectiveAmount.set(value);
  }

  confirmPayment(): void {
    const sale = {
      id: '',
      items: this.cartService.items(),
      subtotal: this.cartService.subtotal(),
      discount: this.cartService.discount(),
      total: this.cartService.total(),
      paymentMethod: this.paymentMethod(),
      paymentDetails:
        this.paymentMethod() === 'efectivo'
          ? {
              cash: this.effectiveAmount(),
              change: this.calculateChange(),
            }
          : this.paymentMethod() === 'mixto'
            ? {
                cash: this.mixedCash(),
                card: this.mixedCard(),
                mercadopago: this.mixedMercadopago(),
              }
            : undefined,
      timestamp: new Date(),
    };

    this.salesService.saveSale(sale);
    this.cartService.clear();
    alert('¡Pago completado!');
    this.router.navigate(['/']);
  }

  cancelPayment(): void {
    this.router.navigate(['/']);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
