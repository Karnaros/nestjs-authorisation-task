import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { EssenceTypes } from './EssenceTypes';
import { Files } from './files.model';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

@Injectable()
export class FilesService {
    constructor(
        @InjectModel(Files) private fileRepository: typeof Files,
    ){}
    
    async createFile(file: Express.Multer.File, essence: EssenceTypes, essenceId: number): Promise<Files> {
        try{
            const dirpath = path.resolve(__dirname, 'static');
            const inputFileName = file.originalname.split('.');
            const fileExtension = inputFileName.length > 1 ? inputFileName.at(-1) : '';
            const fileName: string = uuid.v4() + '.' + fileExtension;

            if(!fs.existsSync(dirpath)){
                await fs.promises.mkdir(dirpath, { recursive: true });
            }            
            
            await fs.promises.writeFile(path.join(dirpath, fileName), file.buffer);

            const savedFile = await this.fileRepository.create({
                filename: fileName,
                essenceTable: essence,
                essenceId: essenceId
            });        

            return savedFile;
        } catch(e) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

    async createFileUnbound(file: Express.Multer.File){
        return this.createFile(file, null, null);
    }

    async unbindFile(filename: string){
        const file = await this.fileRepository.findOne({where: {filename}})
        if(!file) return;
        file.essenceTable = null;
        file.essenceId = null;
        await file.save();
    }

    async bindFile(filename: string, essence: EssenceTypes, essenceId: number){
        const file = await this.fileRepository.findOne({where: {filename}})
        file.essenceTable = essence;
        file.essenceId = essenceId;
        await file.save();

    }

    async deleteDeprecatedFiles(){
        const deprecationTime = new Date(Number(new Date()) - /* 60 * */ 60 * 1000);
        const queryObj = {
            where:{
                createdAt:{
                    [Op.lt]: deprecationTime,
                },
                essenceId: null,
                essenceTable: null,
            },
        };        
        const dirpath = path.resolve(__dirname, 'static');

        const files = await this.fileRepository.findAll(queryObj);

        for (const file of files) {
            try{
                await fs.promises.unlink(path.join(dirpath, file.filename));
            } catch(e) {
                throw new HttpException('Произошла ошибка при удалении файла', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }

        await this.fileRepository.destroy(queryObj);

        return files;
    }
}
