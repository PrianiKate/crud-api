import { UserModel } from './UserModel';
import { validate } from 'uuid';

export const validateUuid = (id: string) => validate(id);

export const validateUserModel = (userData: Omit<UserModel, 'id'>) => {
  const username = userData?.username;
  const age = userData?.age;
  const hobbies = userData?.hobbies;

  return (
    typeof username === 'string' &&
    typeof age === 'number' &&
    Array.isArray(hobbies) &&
    hobbies.every((hobby) => typeof hobby === 'string')
  );
};
