import * as uuid from 'uuid';

export class Payload {
  constructor(issuer: string) {
    var date = new Date();
    this.iss = issuer;
    this.exp = new Date(date.getTime() + 10 * 60000).getTime().toString();
    this.iat = date.getTime().toString();
    this.aud = 'ad-server';
    this.nuance = uuid.v4();
  }

  iss: string;
  exp: string;
  iat: string;
  aud: string;
  nuance: string;

  isExpired(): boolean {
    return new Date().getTime() > +this.exp;
  }
}