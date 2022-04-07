import express, { json } from 'express';
import 'express-async-errors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import path from 'path';

import { PORT } from './server/config.js';
import { Router } from './server/routes/router.js';
import { handleError } from './server/middleware/errors.js';
import './server/db/db.js';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'client', 'build')));

import './server/middleware/passport.js';

app.use('/', Router);
app.use(handleError);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => console.log('Server has started.'));
