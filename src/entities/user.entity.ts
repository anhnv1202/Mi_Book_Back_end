import CoreEntity from '@base/base.entity';
import { Roles } from '@common/constants/global.const';
import { Column, Entity, Unique } from 'typeorm';

@Entity('users')
export class User extends CoreEntity {
  @Column({ nullable: true })
  googleId: string;

  @Column('boolean', { default: false })
  deactive: boolean;

  @Unique('user-email', [])
  @Column({ nullable: true })
  email: string;

  @Unique('user-username', [])
  @Column({ nullable: false })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Unique('user-phone', [])
  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ default: Roles.USER }) role: number;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  gender: boolean;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  salary: number;

  constructor(data: unknown) {
    super();
    this._transform(data);
  }
}
