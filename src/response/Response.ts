import http, { IncomingMessage } from 'http';
import { ResponseRepository } from './ResponseRepositiory';

export class Response implements ResponseRepository
{
  #res: http.ServerResponse<IncomingMessage>;

  constructor(res: http.ServerResponse<IncomingMessage>) {
    this.#res = res;
  }

  json(status: number, data: unknown): void {
    this.#res.writeHead(status, {
      'Content-Type': 'application/json',
    });
    this.#res.end(JSON.stringify(data));
  }
}
