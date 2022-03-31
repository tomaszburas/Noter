import express, {json} from "express";
import 'express-async-errors';
import passport from "passport";

import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {PORT} from "./config.js";
import {Router} from "./routes/router.js";
import {handleError} from "./middleware/errors.js";
import './db/db.js';

const app = express();

app.use(json());
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'build')));

import './middleware/passport.js';

app.use('/', Router);

app.use(handleError);

app.listen(PORT, () => console.log('Server has started.'));
