import http from 'http';

const PORT = 3000;

const server = http.createServer(function (req, res) {
  res.writeHead(200);
  res.end('My first server!');
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
