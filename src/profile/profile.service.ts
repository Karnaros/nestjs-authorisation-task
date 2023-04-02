import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.model';

@Injectable()
export class ProfileService {
    constructor(
        private userService: UserService,        
        @InjectModel(Profile) private profileRepository: typeof Profile,
    ){}

    async createProfile(userDto: CreateUserDto, profileDto: CreateProfileDto){
        const user = await this.userService.createUser(userDto);
        profileDto = {...profileDto, id: user.id};
        const profile = await this.profileRepository.create(profileDto);
        return profile;
    }

    async getAllProfiles() {
        const profiles = await this.profileRepository.findAll();
        return profiles;
    }

    async getOneProfile(id: number) {
        const profile = await this.profileRepository.findByPk(id);
        if (!profile) {
            throw new HttpException('Профиль не найден', HttpStatus.NOT_FOUND);
        }
        return profile;
    }

    async updateProfile(profileDto: CreateProfileDto) {
        const profile = await this.profileRepository.findByPk(profileDto.id);

        if(!profile) {
            throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
        }

        for (const key in profileDto) {
            if (profileDto[key] !== undefined) {
                profile[key] = profileDto[key];
            }
        }
        await profile.save();
        return profile;
    }

    async deleteProfile(id: number) {
        const profile = await this.profileRepository.findByPk(id);        
        await profile.destroy();
        await this.userService.deleteUser(id);
        return profile;   
    }
}
