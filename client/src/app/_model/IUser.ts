import { IStockPurchased } from './IStockPurchased';

export interface IUser {
  uid: string;
  total: number;
  name: string;
  stock: IStockPurchased[];
}
