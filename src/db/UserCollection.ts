import { UserCollectionRepository } from './UserCollectionRepository';
import { UserModel } from './UserModel';
import { v4 as uuidv4 } from 'uuid';

export class UserCollection implements UserCollectionRepository {
  #items: UserModel[];

  constructor() {
    this.#items = [];
  }

  findAll() {
    return this.#items;
  }

  findOne(id: string) {
    return this.#items.find((item) => item.id === id) ?? null;
  }

  create(userData: Omit<UserModel, 'id'>) {
    const item = {
      id: uuidv4(),
      ...userData,
    };
    this.#items.push(item);
    return item;
  }

  updateOne(id: string, userData: Omit<UserModel, 'id'>) {
    if (!this.findOne(id)) {
      return null;
    }
    const updatedUser = { id, ...userData };
    this.#items = this.#items.map((item) =>
      item.id === id ? { id, ...userData } : item
    );
    return updatedUser;
  }

  deleteOne(id: string) {
    if (!this.findOne(id)) {
      return false;
    }
    this.#items = this.#items.filter((item) => item.id !== id);
    return true;
  }
}
