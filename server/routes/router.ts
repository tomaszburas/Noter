import express from 'express';
import { Controller } from '../controllers/controller.js';
import { authenticateJwt } from '../utils/authenticateJwt.js';

export const Router = express.Router();

Router.use('/api', authenticateJwt);

Router.post('/sign-in', Controller.signIn)
    .post('/sign-up', Controller.signUp)
    .get('/logout', Controller.logout)

    .get('/api/auth', Controller.auth)
    .get('/api/notes', Controller.getNotes)
    .get('/api/notes/:id', Controller.getNote)
    .post('/api/notes', Controller.addNote)
    .delete('/api/notes/:id', Controller.deleteNote)
    .put('/api/notes', Controller.updateNote);
