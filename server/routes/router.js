import express from 'express';
import {Controller} from "../controllers/controller.js";
import passport from "passport";

export const Router = express.Router();

Router.use('/notes', passport.authenticate('jwt', {session: false}));

Router
    .post('/sign-in', Controller.signIn)
    .post('/sign-up', Controller.signUp)

    .get('/notes', Controller.getNotes)
    .get('/notes/:id', Controller.getNote)
    .post('/notes', Controller.addNote)
    .delete('/notes/:id', Controller.deleteNote)
    .put('/notes', Controller.updateNote)

