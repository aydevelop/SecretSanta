import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PairEntity } from 'src/domain/entities/pair.entity';
import { UserEntity } from 'src/domain/entities/user.entity';
import { WishEntity } from 'src/domain/entities/wish.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, WishEntity, PairEntity])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
