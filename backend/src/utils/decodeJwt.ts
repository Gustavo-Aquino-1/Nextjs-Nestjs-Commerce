import { verify } from 'jsonwebtoken';
import { Request } from 'express';

export default function decodeJwt(req: Request) {
  return verify(
    req.header('Authorization'),
    process.env.JWT_SECRET_ACESS_TOKEN,
  );
}
