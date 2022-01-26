import { IWish } from './wish';

export interface IUser {
  id?: number;
  name: string;
  surname: string;
  wishes?: IWish[];
}
