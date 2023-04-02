import { Column, DataType, Table, Model, } from "sequelize-typescript";
import { EssenceTypes } from "./EssenceTypes";

interface FilesCreationAttrs {
    filename: string;
    essenceTable: EssenceTypes;
    essenceId: number;
}

@Table({tableName: 'files'})
export class Files extends Model<Files, FilesCreationAttrs> {
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true, })
    id: number;

    @Column( {type: DataType.STRING, unique: true, allowNull: false, } )
    filename: string;

    @Column( {type: DataType.ENUM(...Object.values(EssenceTypes)), } )
    essenceTable: EssenceTypes;

    @Column( {type: DataType.INTEGER, } )
    essenceId: number;
}