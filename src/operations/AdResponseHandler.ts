import {AdResponse} from "../models/AdResponse";
export interface AdResponseHandler {
  handleResponse(response: AdResponse): void;
}