import { Controller, Delete, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { Roles } from "src/user/Roles";
import { AccessRoles } from 'src/auth/role-access.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FilesController {
    constructor(private filesService: FilesService){}

    @AccessRoles(Roles.ADMIN, Roles.USER)
    @UseGuards(RolesGuard)
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    create(
        @UploadedFile() file: Express.Multer.File,
    ){
        return this.filesService.createFileUnbound(file);
    }

    @AccessRoles(Roles.ADMIN)
    @UseGuards(RolesGuard)
    @Delete('/purge')
    delete(){
        return this.filesService.deleteDeprecatedFiles();
    }
}
