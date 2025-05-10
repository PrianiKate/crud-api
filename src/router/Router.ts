import http from 'http';
import { Route } from '../model/general';
import { RouterRepository } from './RouterRepository';
import { Response } from '../response/Response';
import { matchRequestRoute } from './matchRequestParams';

export class Router implements RouterRepository {
  #routes: Route[] = [];

  constructor() {}

  addRoute(
    method: Route['method'],
    path: Route['path'],
    callback: Route['callback']
  ): void {
    this.#routes.push({
      method,
      path,
      callback,
    });
  }

  private async getBody(req: http.IncomingMessage) {
    const body: Buffer[] = [];
    for await (const chunk of req) {
      body.push(chunk);
    }
    const bodyStr = Buffer.concat(body).toString();
    if (!bodyStr) {
      return null;
    }
    return JSON.parse(bodyStr);
  }

  run(
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage>
  ): void {
    let isRouteFound = false;
    const response = new Response(res);
    this.#routes.forEach(async (route) => {
      const matchRoute = matchRequestRoute(req, route);
      if (matchRoute.isFound) {
        isRouteFound = true;
        try {
          const body = await this.getBody(req);
          route.callback({ body, params: matchRoute.params }, response);
        } catch (e) {
          console.error(e);
          response.json(500, { message: 'Internal server error' });
        }
      }
    });
    if (!isRouteFound) {
      response.json(404, { message: 'Not found' });
    }
  }
}
