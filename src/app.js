import bodyParser from 'body-parser';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const port = parseInt(process.env.PORT, 10) || 8000;

app.use(logger('dev'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  credentials: true,
}));

app.get('*', (request, response) => response.status(200).send({
  message: 'Welcome to Phone Number Generator Application API!!!',
}));


app.listen(port, () => console.log(`server is up and running on localhost: ${port}`));

export default app;