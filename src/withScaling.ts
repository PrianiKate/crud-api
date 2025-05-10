import http from 'http';
import dotenv from 'dotenv';
import { UsersRouter } from './router/UsersRouter';
import cluster from 'cluster';
import os from 'os';
import { UserCollection } from './db/UserCollection';

dotenv.config();

const numCPUs = os.availableParallelism();
const port = process.env.PORT ?? 4000;
let requestIter = 0;

const createPrimaryLoadBalancerServer = (port: number) => {
  http
    .createServer((req, res) => {
      const requestPort = port + (requestIter++ % (numCPUs - 1)) + 1;
      console.log(`Sending a message to port ${requestPort}`);

      req.pipe(
        http.request(
          {
            port: requestPort,
            method: req.method,
            path: req.url,
          },
          (response) => response.pipe(res)
        )
      );
    })
    .listen(port, () =>
      console.log(`Server is running on http://localhost:${port}`)
    );
};

const createWorkerServer = (port: number) => {
  http
    .createServer((req, res) => {
      console.log(`Got a message on port ${port}`);
      UsersRouter.run(req, res);
    })
    .listen(port, () =>
      console.log(`Worker server is running on http://localhost:${port}`)
    );
};

if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs - 1; i++) {
    cluster.fork();
  }
  createPrimaryLoadBalancerServer(+port);

  const userCollection = new UserCollection();

  for (const id in cluster.workers) {
    const worker = cluster.workers[id]!;

    worker.on('message', (message) => {
      const parameters = message.params ?? [];
      const type = message.type;

      const result = ((userCollection as never)[type] as Function)(
        ...parameters
      );
      worker.send({ type, result });
    });
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const workerPort = +port + cluster.worker!.id;
  createWorkerServer(workerPort);
}
