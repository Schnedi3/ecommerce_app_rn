export interface IProduct {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

export interface ICartItem extends IProduct {
  product_id: number;
}
