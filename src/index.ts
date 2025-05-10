import http from 'http';
import dotenv from 'dotenv';
import { UsersRouter } from './router/UsersRouter';

dotenv.config();

const server = http.createServer(function (req, res) {
  UsersRouter.run(req, res);
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
