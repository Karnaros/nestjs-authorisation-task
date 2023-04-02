import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/user.model';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private jwtService: JwtService){}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        
        if(!user){
            throw new UnauthorizedException({message: 'Некорректный email'});
        }

        const passwordEquals = await bcrypt.compare(userDto.password, user.password);

        if (passwordEquals) {
            return user;
        }
        
        throw new UnauthorizedException({message: 'Некорректный пароль'});
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, role: user.role}
        return {
            token: this.jwtService.sign(payload)
        };
    }
    
}
