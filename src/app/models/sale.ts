export interface Sale {
  id: string;
  items: Array<{ product: any; quantity: number; weight?: number; subtotal: number }>;
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: 'efectivo' | 'tarjeta' | 'mercadopago' | 'mixto';
  paymentDetails?: {
    cash?: number;
    card?: number;
    mercadopago?: number;
    change?: number;
  };
  timestamp: Date;
}
