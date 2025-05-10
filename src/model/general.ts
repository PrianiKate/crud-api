import { Request } from '../request/Request';
import { Response } from '../response/Response';

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type RouteCallback = (req: Request, res: Response) => void;

export interface Route {
  method: HttpMethod;
  path: string;
  callback: RouteCallback;
}
