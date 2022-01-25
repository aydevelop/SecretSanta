import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { WishEntity } from './wish.entity';

@Entity({ name: 'pairs' })
export class PairEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  sender: UserEntity;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  recipient: UserEntity;
}
