export interface Product {
  id: string;
  name: string;
  english_name: any;
  image: string;
  price: string;
  category: string;
  cart_items?: Cart[];
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
export interface Order {
  id?: any;
  user_id?: string;
  cart_items: Cart[];
}

export interface User {
  id: string;
  // name: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  profile?: ProfileUser;
}
export interface ProfileUser {
  id?: string;
  first_name?: string;
  last_name?: string;
  created_at?: string;
  mobile?: string;
  address?: string;
  image?: string;
}
