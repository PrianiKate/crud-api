import { UserCollection } from '../db/UserCollection';
import { HttpMethod } from '../model/general';
import { Router } from './Router';
import { Request } from '../request/Request';
import { Response } from '../response/Response';
import { validateUserModel, validateUuid } from '../db/validators';
import cluster from 'cluster';
import { WorkerUserCollection } from '../db/WorkerUserCollection';

export const UsersRouter = new Router();
const UsersCollectionEntity = cluster.isWorker
  ? new WorkerUserCollection()
  : new UserCollection();

const MAIN_ROUTE = '/api/users';
const ITEM_ROUTE = '/api/users/:userId';

UsersRouter.addRoute(
  HttpMethod.GET,
  MAIN_ROUTE,
  async (_: Request, res: Response) => {
    const items = await UsersCollectionEntity.findAll();
    res.json(200, items);
  }
);

UsersRouter.addRoute(
  HttpMethod.GET,
  ITEM_ROUTE,
  async (req: Request, res: Response) => {
    const userId = req.params['userId'];
    if (!validateUuid(userId)) {
      res.json(400, { message: 'User id is invalid' });
      return;
    }
    const user = await UsersCollectionEntity.findOne(userId);
    if (user) {
      res.json(200, user);
    } else {
      res.json(404, { message: 'User not found' });
    }
  }
);

UsersRouter.addRoute(
  HttpMethod.POST,
  MAIN_ROUTE,
  async (req: Request, res: Response) => {
    const body = req.body;
    if (!body || !validateUserModel(body)) {
      res.json(400, { message: 'Body does not contain required fields' });
      return;
    }
    const addedUser = await UsersCollectionEntity.create(body);
    res.json(201, addedUser);
  }
);

UsersRouter.addRoute(
  HttpMethod.PUT,
  ITEM_ROUTE,
  async (req: Request, res: Response) => {
    const userId = req.params['userId'];
    if (!validateUuid(userId)) {
      res.json(400, { message: 'User id is invalid' });
      return;
    }
    const body = req.body;
    if (!body || !validateUserModel(body)) {
      res.json(400, { message: 'Body does not contain required fields' });
      return;
    }
    const updatedUser = await UsersCollectionEntity.updateOne(userId, body);
    if (!updatedUser) {
      res.json(404, { message: 'User not found' });
    } else {
      res.json(200, updatedUser);
    }
  }
);

UsersRouter.addRoute(
  HttpMethod.DELETE,
  ITEM_ROUTE,
  async (req: Request, res: Response) => {
    const userId = req.params['userId'];
    if (!validateUuid(userId)) {
      res.json(400, { message: 'User id is invalid' });
      return;
    }
    const result = await UsersCollectionEntity.deleteOne(userId);
    if (!result) {
      res.json(404, { message: 'User not found' });
    } else {
      res.json(204, {});
    }
  }
);
