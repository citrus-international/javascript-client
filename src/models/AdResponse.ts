import {Ad} from "./Ad";
export interface AdResponse {
  isSuccessful: boolean;
  ads: Array<Ad>;
}