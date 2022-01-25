import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PairEntity } from 'src/domain/entities/pair.entity';
import { UserEntity } from 'src/domain/entities/user.entity';
import { WishEntity } from 'src/domain/entities/wish.entity';
import { GameController } from './game.controller';
import { GameService } from './game.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, WishEntity, PairEntity])],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
