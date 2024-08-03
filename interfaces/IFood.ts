// To parse this data:
//
//   import { Convert, IFood } from "./file";
//
//   const iFood = Convert.toIFood(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

import { IRestaurant } from "./IRestaurant";

export interface IFood {
  id: number;
  name: string;
  description: string;
  price: number;
  default_image: string;
  status: string;
  pivot: any;
  restaurant_id: number;
  sub_category_id: number;
  cloud_file_id: null;
  created_at: Date;
  updated_at: Date;
  restaurant: IRestaurant;
}
