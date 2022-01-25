import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/domain/dtos/users/create-user.dto';
import { UserEntity } from 'src/domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WishEntity } from 'src/domain/entities/wish.entity';
import { PairEntity } from 'src/domain/entities/pair.entity';
import { gameConstants } from 'src/constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(WishEntity)
    private readonly wishRepository: Repository<WishEntity>,
    @InjectRepository(PairEntity)
    private readonly pairRepository: Repository<PairEntity>,
  ) {}

  async create(user: CreateUserDTO) {
    let usersLen: number = await this.userRepository.count();
    if (usersLen > gameConstants.maxUsers) {
      throw new HttpException('No free slots', HttpStatus.BAD_REQUEST);
    }

    let savedWishes: WishEntity[] = [];
    if (Array.isArray(user.wishes) && user.wishes.length) {
      savedWishes = await this.wishRepository.save(
        user.wishes.map((q) => ({ name: q } as WishEntity)),
      );
    }

    const savedUser: UserEntity = new UserEntity();
    savedUser.name = user.name;
    savedUser.surname = user.surname;
    savedUser.wishes = savedWishes;

    await this.userRepository.save(savedUser);
    return { ...savedUser, wishes: savedWishes };
  }

  async getRecipientBySenderId(id: number) {
    let pair: PairEntity = await this.pairRepository.findOne(
      { sender: { id } },
      {
        relations: ['recipient'],
      },
    );

    if (!pair) {
      throw new HttpException('Pair not found', HttpStatus.NOT_FOUND);
    }

    let wishes: WishEntity[] = await this.wishRepository.find({
      user: { id: pair.recipient.id },
    });

    return { ...pair.recipient, wishes };
  }
}
