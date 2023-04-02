import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileService } from './profile.service';
import { SelfGuard } from 'src/auth/self.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService){}

    @UsePipes(ValidationPipe)
    @Post('/registration')
    create(
        @Body() userdto: CreateUserDto,
        @Body() profileDto: CreateProfileDto,
    ){
        return this.profileService.createProfile(userdto, profileDto);
    }

    @Get()
    getAll(){
        return this.profileService.getAllProfiles();
    }

    @Get(':id')
    getOne(
        @Param('id') id: string,
    ){
        return this.profileService.getOneProfile(Number(id));
    }

    @UseGuards(SelfGuard)
    @UsePipes(ValidationPipe)
    @Patch()
    update(
        @Body() profileDto: CreateProfileDto,
    ){
        return this.profileService.updateProfile(profileDto);
    }

    @UseGuards(SelfGuard)
    @UsePipes(ValidationPipe)
    @Delete()
    delete(
        @Body() profileDto: CreateProfileDto,
    ){
        return this.profileService.deleteProfile(profileDto.id);
    }
}
