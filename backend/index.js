import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { validationResult } from 'express-validator';
import validateFormData from './validator.js';

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: ['http://localhost:8080'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const positions = ['Менеджер', 'Разработчик', 'Тестировщик'];

app.get('/positions', (req, res) => {
  res.json(positions);
});

app.post('/submit-form', validateFormData, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  } else {
    res.sendStatus(200);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});