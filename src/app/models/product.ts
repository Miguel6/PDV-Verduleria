export interface Product {
  id: string;
  name: string;
  category: 'frutas' | 'verduras' | 'ofertas' | 'varios';
  type: 'kg' | 'unidad';
  price: number;
  imageUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  weight?: number; // For kg items
  subtotal: number;
}
