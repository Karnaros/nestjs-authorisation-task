import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { FilesModule } from './content/files/files.module';
import { TextBlockModule } from './content/text-block/text-block.module';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from "@nestjs/sequelize";
import { Profile } from "./profile/profile.model";
import { User } from "./user/user.model";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from 'path';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        SequelizeModule.forRoot({
          dialect: 'postgres',
          host: process.env.PGHOST,
          port: Number(process.env.PGPORT),
          username: process.env.PGUSER,
          password: process.env.PGPASSWORD,
          database: process.env.PGDATABASE,
          models: [User, Profile],
          autoLoadModels: true,
          synchronize: true,
        }),
        ServeStaticModule.forRoot({
          rootPath: path.resolve(__dirname, 'content', 'files', 'static')
        }),
        UserModule,
        ProfileModule,
        FilesModule,
        TextBlockModule,
        AuthModule,        
      ],
})
export class AppModule {

}
