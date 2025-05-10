import { Route } from '../model/general';
import http from 'http';

export interface RouterRepository {
  addRoute(
    method: Route['method'],
    path: Route['path'],
    callback: Route['callback']
  ): void;

  run(req: http.IncomingMessage, res: http.ServerResponse): void;
}
