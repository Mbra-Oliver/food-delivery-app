import { IFood } from "./IFood";

export interface IOrder {
  created_at: Date;
  delivered_date: null;
  foods: IFood[];
  id: number;
  order_date: Date;
  status: string;
  updated_at: Date;
  user_id: number;
}
