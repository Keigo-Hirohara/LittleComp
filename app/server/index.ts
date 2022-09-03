import express from 'express';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  return res.status(200).send({
    message: 'Hello World!',
  });
});

app.listen(PORT, () => {
  console.log('Listening on PORT: 5000');
});
