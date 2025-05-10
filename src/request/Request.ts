import { UserModel } from '../db/UserModel';

export interface Request {
  body: Omit<UserModel, 'id'> | undefined;
  params: Record<string, string>;
}
