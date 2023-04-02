import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { Roles } from "./Roles";
import { AddRoleDto } from './dto/add-role.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
    ){}

    async createUser(dto: CreateUserDto){
        const hashPassword = await bcrypt.hash(dto.password, 10);
        const user = await this.userRepository.create({...dto, password: hashPassword});
        return user;
    }

    async addRole(dto: AddRoleDto){
        const user = await this.userRepository.findByPk(dto.id);
        const role = Roles[dto.role];
        if(user && role){
            user.role = role;
            await user.save();
            return dto;
        }
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}})
        return user;
    }

    async deleteUser(id: number) {
        const user = await this.userRepository.findByPk(id);
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        await user.destroy();
        return user;
    }

    async getOneUser(id: number) {
        const user = await this.userRepository.findByPk(id);
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll();
        return users;
    }
}
