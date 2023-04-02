import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { Roles } from "../Roles";

export class AddRoleDto {
    @IsNotEmpty()
    @IsNumber({}, {message: 'Должно быть числом'})
    readonly id: number;
    @IsNotEmpty()
    @IsEnum(Roles, {message: 'Должно содержаться в enum "Roles"'})
    readonly role: string;
}
