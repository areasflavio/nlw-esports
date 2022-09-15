import express from 'express';

const server = express();

const PORT = process.env.PORT || 3333;

server.get('/', (req, res) => {
  return res.json({ hello: 'World' });
});

server.listen(PORT, () => console.log(`Server is up on port... ${PORT}`));
