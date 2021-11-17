export default interface IProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  stock_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  stock: IStock | null;
}

interface IStock {
  id: string;
  name: string;
}
