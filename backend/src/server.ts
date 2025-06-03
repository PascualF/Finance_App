import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Finance App API');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});