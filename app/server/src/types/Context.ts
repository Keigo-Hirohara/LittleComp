import { JwtPayload } from 'jsonwebtoken';

export type Context = {
  jwt: Jwt;
  verified: JwtPayload | string | null;
};

export type VerifiedObject = {
  id: string;
  email: string;
  iat: number;
  exp: number;
};

export type Jwt = {
  secret: string;
  expiresIn: string;
};
