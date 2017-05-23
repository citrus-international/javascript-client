import {Payload} from "../models/Payload";
export interface PayloadSigner {
  sign(payload: Payload): Payload;
}