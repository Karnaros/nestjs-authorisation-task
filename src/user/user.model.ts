import { Column, DataType, Table, Model, HasOne } from "sequelize-typescript";
import { Profile } from "src/profile/profile.model";
import { Roles } from "./Roles";

interface UserCreationAttrs {
    email: string;
    password: string;
    login: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true, })
    id: number;

    @Column( {type: DataType.STRING, unique: true, allowNull: false, } )
    email: string;

    @Column( {type: DataType.STRING, allowNull: false, } )
    password: string;

    @Column( {type: DataType.ENUM(...Object.values(Roles)), defaultValue: Roles.USER, } )
    role: Roles;
    
    @HasOne(() => Profile)
    profile: Profile;
}