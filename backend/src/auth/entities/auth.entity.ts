import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('auth')
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    unique: true,
  })
  nickname: string;

  @Column({
    type: 'text',
    select: false,
  })
  password: string;

  @Column({
    type: 'text',
  })
  fullName: string;

  @Column({
    type: 'bool',
    default: true,
  })
  isActive: boolean;

  @Column({
    type: 'text',
    array: true,
    default: ['admin'],
  })
  roles: string[];

  //--
  @BeforeInsert()
  checkNickname() {
    this.nickname = this.nickname.toLowerCase().trim();
  }

  //--
  @BeforeUpdate()
  checkNicknameUpdate() {
    this.checkNickname();
  }
}
