import { Routes } from '@angular/router';
import { PosComponent } from './components/pos/pos.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AdminComponent } from './components/admin/admin.component';
import { SettingsComponent } from './components/settings/settings.component';

export const routes: Routes = [
  { path: '', component: PosComponent },
  { path: 'pago', component: PaymentComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'configuracion', component: SettingsComponent },
  { path: '**', redirectTo: '' },
];
