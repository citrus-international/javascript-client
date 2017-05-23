import {OrderItem} from "./OrderItem";
export class Context{
  userId: string;
  searchTerm: string;
  categoryHeirarchy: string;
  pageType: string;
  currentCartItems: Array<OrderItem>;
  gtin: string;
}