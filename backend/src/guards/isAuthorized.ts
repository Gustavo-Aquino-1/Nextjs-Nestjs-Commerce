import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken'; // i have to import verify directly to it find this method.
import 'dotenv/config';
// import { Observable } from 'rxjs';

@Injectable()
export default class IsAuthorized implements CanActivate {
  constructor(private role?: string) {} // if needs verify if is an admin for an example

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization;
    try {
      const decoded = verify(token, process.env.JWT_SECRET_ACESS_TOKEN) as any;
      if (this.role && decoded.role != this.role) throw new Error();
      return true;
    } catch (error) {
      throw new UnauthorizedException({ message: 'invalid token' });
    }
  }
}

// : boolean | Promise<boolean> | Observable<boolean> {
