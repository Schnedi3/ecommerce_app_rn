export interface IProduct {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

export interface IOrderProps {
  created_at: string;
  image: string;
  price: string;
  quantity: number;
  title: string;
  total_price: string;
}

export interface ICartItem extends IProduct {
  product_id: number;
  quantity: number;
}

export interface IAuthStore {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}
