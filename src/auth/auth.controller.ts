import { Body, Controller, UsePipes } from '@nestjs/common';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller('auth')
export class AuthController {

    constructor(private authservice: AuthService){}

    @UsePipes(ValidationPipe)
    @Post('/login')
    login( @Body() userDto: CreateUserDto ){
        return this.authservice.login(userDto);        
    }
}
