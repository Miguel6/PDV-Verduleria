import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-numeric-keyboard',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatIconModule, MatButtonModule, FormsModule],
  templateUrl: './numeric-keyboard.component.html',
  styleUrl: './numeric-keyboard.component.scss',
})
export class NumericKeyboardComponent {
  display = '';
  valueChange = output<number>();

  onNumber(num: number): void {
    this.display += num.toString();
  }

  onDecimal(): void {
    if (!this.display.includes('.')) {
      this.display += '.';
    }
  }

  onDelete(): void {
    this.display = this.display.slice(0, -1);
  }

  onClear(): void {
    this.display = '';
  }

  onConfirm(): void {
    const value = parseFloat(this.display) || 0;
    this.valueChange.emit(value);
    this.display = '';
  }
}
