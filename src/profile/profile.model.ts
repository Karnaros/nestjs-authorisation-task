import { Column, DataType, Table, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "src/user/user.model";

interface ProfileCreationAttrs {
    firstname: string;
    middlename: string;
    lastname: string;
    phoneNumber: string;
    about: string;
}

@Table({tableName: 'profiles'})
export class Profile extends Model<Profile, ProfileCreationAttrs> {
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, })
    id: number;

    @Column( {type: DataType.STRING, } )
    firstname: string;

    @Column( {type: DataType.STRING, } )
    middlename: string;
    
    @Column( {type: DataType.STRING, } )
    lastname: string;

    @Column( {type: DataType.STRING, } )
    phoneNumber: string;
    
    @Column( {type: DataType.TEXT, } )
    about: string;

    @BelongsTo(() => User)
    user: User;
}