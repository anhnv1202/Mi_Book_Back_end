// import AppDataSource from '@database/data_source';
import BaseRepository from '@base/base.repository';
import { ChangeActiveAuth } from '@common/interfaces/account.interface';
import { GetCustomRepo } from '@common/utils/custom_repository.util';
import AppDataSource from '@database/data_source';
import { User } from '@entities/user.entity';
import { UpdateResult } from 'typeorm';

class _UserRepository extends BaseRepository<User> {
  async getAll() {
    return this.paginate();
  }
  active = async (data: ChangeActiveAuth): Promise<UpdateResult | boolean> => {
    if (!data.listId.length) return true;
    return this.update([...data.listId], { deactive: !data.isActive });
  };
}
const UserRepository = GetCustomRepo(User, _UserRepository, AppDataSource);
export default UserRepository;
