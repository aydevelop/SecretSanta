import { Controller, Post } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Post('shuffle')
  async shuffle(): Promise<string> {
    return this.gameService.shuffle();
  }
}
