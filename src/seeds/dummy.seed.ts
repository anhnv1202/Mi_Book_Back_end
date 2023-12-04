import { COMMON_SEED_PASSWORD_USER, Roles } from '@common/constants/global.const';
import { User } from '@entities/user.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

const users = [
  {
    role: Roles.USER,
    username: 'user123',
    password: COMMON_SEED_PASSWORD_USER,
    phoneNumber: '001-232-321',
    email: 'us01@academy.com.vn',
  },
  {
    role: Roles.ADMIN,
    username: 'admin123',
    password: COMMON_SEED_PASSWORD_USER,
    phoneNumber: '001-232-323',
    email: 'us02@academy.com.vn',
  },
];

export default class CreateCategory implements Seeder {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.createQueryBuilder().insert().into(User).values(users).updateEntity(false).execute();
  }
}
