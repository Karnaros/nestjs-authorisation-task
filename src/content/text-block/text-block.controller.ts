import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { TextBlockService } from './text-block.service';
import { CreateTextBlockDto } from './dto/create-text-block.dto';
import { AccessRoles } from 'src/auth/role-access.decorator';
import { Roles } from "src/user/Roles";
import { RolesGuard } from 'src/auth/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller('text-block')
export class TextBlockController {
    constructor(private textBlockService: TextBlockService){}

    @AccessRoles(Roles.ADMIN)
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    create(
        @Body() textBlockDto: CreateTextBlockDto,
        @UploadedFile() file: Express.Multer.File,
    ){
        return this.textBlockService.createTextBlock(textBlockDto, file);
    }

    @Get()
    getAll(){
        return this.textBlockService.getAllTextBlocks();
    }

    @Get('/group/:group')
    getGroup(
        @Param('group') group: string,
    ){
        return this.textBlockService.getTextBlocksByGroup(group);
    }

    @Get(':name')
    getOne(
        @Param('name') name: string,
    )
    {
        return this.textBlockService.getTextBlockByName(name);
    }

    @AccessRoles(Roles.ADMIN)
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Patch()
    @UseInterceptors(FileInterceptor('file'))
    update(
        @Body() textBlockDto: CreateTextBlockDto,
        @UploadedFile() file: Express.Multer.File,
    ){
        return this.textBlockService.updateTextBlock(textBlockDto, file);
    }

    @AccessRoles(Roles.ADMIN)
    @UseGuards(RolesGuard)
    @Delete(':name')
    delete(
        @Param('name') name: string,
    ){
        return this.textBlockService.deleteTextBlock(name);
    }
}
