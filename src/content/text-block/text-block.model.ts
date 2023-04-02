import { Column, DataType, Table, Model, } from "sequelize-typescript";

interface TextBlockCreationAttrs {
    name: string;
    group: string;
    title: string;
    file: string;
    text: string;
}

@Table({tableName: 'text-blocks'})
export class TextBlock extends Model<TextBlock, TextBlockCreationAttrs> {
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true, })
    id: number;

    @Column( {type: DataType.STRING, unique: true, allowNull: false, } )
    name: string;
    
    @Column( {type: DataType.STRING, allowNull: false, } )
    group: string;

    @Column( {type: DataType.STRING, defaultValue: '', allowNull: false, } )
    title: string;
    
    @Column( {type: DataType.STRING, } )
    file: string;

    @Column( {type: DataType.TEXT, } )
    text: string;
}