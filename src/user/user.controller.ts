import { Body, Controller, Get, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { AddRoleDto } from './dto/add-role.dto';
import { UserService } from './user.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { AccessRoles } from 'src/auth/role-access.decorator';
import { Roles } from "./Roles";
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    
    @AccessRoles(Roles.ADMIN)
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Post('/role')
    addRole(
        @Body() addRoleDto: AddRoleDto
    ){
        return this.userService.addRole(addRoleDto);
    }
    
    @AccessRoles(Roles.ADMIN)
    @UseGuards(RolesGuard)
    @Get()
    getAll(){
        return this.userService.getAllUsers();
    }

    @AccessRoles(Roles.ADMIN)
    @UseGuards(RolesGuard)
    @Get(':id')
    getOne(
        @Param('id') id: string,
    ){
        return this.userService.getOneUser(Number(id));
    }
}
