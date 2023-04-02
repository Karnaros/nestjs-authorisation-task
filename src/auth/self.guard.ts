import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {Observable} from "rxjs";
import { Roles } from "src/user/Roles";

@Injectable()
export class SelfGuard implements CanActivate {
    constructor(private jwtService: JwtService,) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const req = context.switchToHttp().getRequest();

            if (!req.headers.authorization) {
                throw new UnauthorizedException({message: 'Пользователь не авторизован'});
            }

            const authHeader = req.headers.authorization.split(' ');
            const bearer = authHeader[0];
            const token = authHeader[1];

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'Пользователь не авторизован'});
            }

            const user = this.jwtService.verify(token);
            req.user = user;
            
            if(req.user.role == Roles.ADMIN){
                return true;
            }

            return req.user.id == req.body.id;
        } catch (e) {
            return false;
        }
    }
}