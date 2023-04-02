import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TextBlock } from './text-block.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTextBlockDto } from './dto/create-text-block.dto';
import { FilesService } from '../files/files.service';
import { EssenceTypes } from '../files/EssenceTypes';

@Injectable()
export class TextBlockService {
    constructor(
        @InjectModel(TextBlock) private textBlockRepository: typeof TextBlock,
        private fileService: FilesService,
    ){}

    async createTextBlock(dto: CreateTextBlockDto, file: Express.Multer.File): Promise<TextBlock> {
        try{
            const textBlock = await this.textBlockRepository.create(dto);        
            if(file){
                const savedFile = await this.fileService.createFile(file, EssenceTypes.TEXTBLOCK, textBlock.id);
                textBlock.file = savedFile.filename;
                await textBlock.save();
            }
            return textBlock;
        } catch(e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    async getAllTextBlocks(): Promise<TextBlock[]> {
        const textBlocks = await this.textBlockRepository.findAll();
        return textBlocks;
    }

    async getTextBlocksByGroup(group: string): Promise<TextBlock[]> {
        const textBlocks = await this.textBlockRepository.findAll({where: {group}});
        return textBlocks;
    }

    async getTextBlockByName(name: string): Promise<TextBlock> {
        const textBlock = await this.textBlockRepository.findOne({where: {name}});
        return textBlock;

    }

    async updateTextBlock(dto: CreateTextBlockDto, file: Express.Multer.File): Promise<TextBlock> {
        const textBlock = await this.textBlockRepository.findOne({where: {name: dto.name}});
        for (const key in dto) {
            if (dto[key] !== undefined) {
                textBlock[key] = dto[key];
            }
        }

        if(file){
            this.fileService.unbindFile(textBlock.file);
            const savedFile = await this.fileService.createFile(file, EssenceTypes.TEXTBLOCK, textBlock.id);
            textBlock.file = savedFile.filename;
        }

        await textBlock.save();
        return textBlock;
    }

    async deleteTextBlock(name: string): Promise<TextBlock> {
        const textBlock = await this.textBlockRepository.findOne({where: {name}});        
        if(textBlock.file){
            this.fileService.unbindFile(textBlock.file);
        }
        await textBlock.destroy();
        return textBlock;
    }
}
