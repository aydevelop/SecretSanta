import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WishEntity } from './wish.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @OneToMany(() => WishEntity, (wish) => wish.user, {
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
  })
  wishes: WishEntity[];
}
