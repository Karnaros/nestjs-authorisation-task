import { Module } from '@nestjs/common';
import { TextBlockService } from './text-block.service';
import { TextBlockController } from './text-block.controller';
import { TextBlock } from './text-block.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from '../files/files.module';

@Module({
  providers: [TextBlockService],
  controllers: [TextBlockController],
  imports: [
    SequelizeModule.forFeature([TextBlock]),
    AuthModule,
    FilesModule,
  ],
})
export class TextBlockModule {}
