import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PairEntity } from 'src/domain/entities/pair.entity';
import { UserEntity } from 'src/domain/entities/user.entity';
import { Repository } from 'typeorm';
import { gameConstants } from 'src/constants';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PairEntity)
    private readonly pairRepository: Repository<PairEntity>,
  ) {}

  async shuffle(): Promise<string> {
    let usersAll: UserEntity[] = await this.userRepository.find();
    let usersLen: number = usersAll.length;
    let pairsLen: number = await this.pairRepository.count();

    if (pairsLen > 0) {
      throw new HttpException('Already shuffled', HttpStatus.BAD_REQUEST);
    }

    if (
      usersLen > gameConstants.maxUsers ||
      usersLen < gameConstants.minUsers
    ) {
      throw new HttpException(
        'Invalid amount of players',
        HttpStatus.BAD_REQUEST,
      );
    }

    let shuffleArray: UserEntity[] = [...usersAll];
    let pairs: PairEntity[] = [];
    for (let i = 0; i < usersLen; i++) {
      let pair: PairEntity = new PairEntity();
      pair.sender = usersAll[i];
      pair.recipient = this.getRandomUser(usersAll[i], shuffleArray);
      pairs.push(pair);
      shuffleArray = shuffleArray.filter((q) => q?.id != pair.recipient?.id);
    }

    this.pairRepository.save(pairs);
    return 'Shuffled';
  }

  private getRandomUser(excludeUser: UserEntity, users: UserEntity[]) {
    let items: UserEntity[] = users.filter((q) => q.id != excludeUser.id);
    return items[Math.floor(Math.random() * items.length)];
  }
}
