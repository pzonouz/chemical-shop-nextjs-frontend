export interface Product {
  id: string;
  name: string;
  english_name: any;
  image: string;
  price: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  products: Product[];
}
export interface Cart {
  id?: any;
  product?: Product;
  product_id?: string;
  quantity: any;
}

export interface User {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  mobile: string;
  address: string;
  image: string;
  is_staff: boolean;
}
export interface RessponseWithError {
  error: any;
}