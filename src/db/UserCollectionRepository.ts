import { UserModel } from './UserModel';

export interface UserCollectionRepository {
  findAll(): UserModel[];

  findOne(id: string): UserModel | null;

  create(userData: Omit<UserModel, 'id'>): UserModel;

  updateOne(id: string, userData: Omit<UserModel, 'id'>): UserModel | null;

  deleteOne(id: string): boolean;
}
