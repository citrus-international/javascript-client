import {Payload} from './Payload';
export interface PayloadSigner {
  (payload: Payload): Promise<string>;
}