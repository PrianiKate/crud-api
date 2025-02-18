import http from 'http';
import dotenv from 'dotenv';

const MAIN_ROUTE = '/api/users';
dotenv.config();

const server = http.createServer(function (req, res) {
  console.log(req.method, req.url);
  res.writeHead(200);
  res.end('My first server!');
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
