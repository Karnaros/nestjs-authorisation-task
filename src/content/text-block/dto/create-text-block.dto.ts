import { IsOptional, IsString } from "class-validator";

export class CreateTextBlockDto {
    @IsString({message: 'Должно быть строкой'})
    readonly name: string;
    @IsString({message: 'Должно быть строкой'})
    readonly group: string;
    @IsString({message: 'Должно быть строкой'})
    readonly title: string;
    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    readonly text: string;
}
