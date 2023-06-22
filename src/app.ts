import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan';
import eventRoutes from './routes/eventRoutes';

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes
app.use('/api/event', eventRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).end();
});


app.listen(3000);