import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { Profile } from './profile.model';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [ProfileService],
  controllers: [ProfileController],
  imports: [
    SequelizeModule.forFeature([Profile, User]),
    UserModule,
    AuthModule,
  ]
})
export class ProfileModule {}
