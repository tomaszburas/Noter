import express from 'express';
import passport from 'passport';
import { Controller } from '../controllers/controller.js';
export const Router = express.Router();
Router.use('/api/notes', passport.authenticate('jwt', { session: false }));
Router.post('/sign-in', Controller.signIn)
    .post('/sign-up', Controller.signUp)
    .get('/logout', Controller.logout)
    .get('/api/notes', Controller.getNotes)
    .get('/api/notes/:id', Controller.getNote)
    .post('/api/notes', Controller.addNote)
    .delete('/api/notes/:id', Controller.deleteNote)
    .put('/api/notes', Controller.updateNote);
//# sourceMappingURL=router.js.map