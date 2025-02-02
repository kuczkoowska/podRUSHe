import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { UsersModule } from '../users/users.module';
import { Package } from '../packages/package.entity';
import { PackagesModule } from '../packages/packages.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Package]), UsersModule, PackagesModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
