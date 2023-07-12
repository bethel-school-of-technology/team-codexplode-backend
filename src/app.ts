import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import eventRoutes from './routes/eventRoutes';
import userRoutes from './routes/userRoutes';
import mongoose from 'mongoose';

const connectionString: string = 'mongodb://127.0.0.1:27017/testDB';

mongoose.connect(connectionString).then(
  () => console.log('database connection successful!'),
  (err) => console.log('Error connecting to the database', err)
);

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/event', eventRoutes);
app.use('/api/user', userRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).end();
});

app.listen(3000);
