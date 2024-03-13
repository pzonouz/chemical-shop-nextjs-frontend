export interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
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
}
export interface RessponseWithError {
  error: any;
}
