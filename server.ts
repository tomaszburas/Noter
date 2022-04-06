import express, { json } from 'express';
import 'express-async-errors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { PORT } from './server/config';
import { Router } from './server/routes/router';
import { handleError } from './server/middleware/errors';
import './server/db/db';

const app = express();

app.use(json());
app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
    })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(__dirname + '/client/build'));

import './server/middleware/passport';

app.use('/', Router);
app.use(handleError);

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html');
});

app.listen(PORT, () => console.log('Server has started.'));
