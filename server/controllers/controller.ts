import { NoteRecord } from '../db/records/note.record';
import { UserRecord } from '../db/records/user.record';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN } from '../config';
import { Request, Response } from 'express';

export class Controller {
    static async getNotes(req: Request, res: Response) {
        const notes = await NoteRecord.getAll(req.user.id);

        res.status(200).json({
            success: true,
            notes,
        });
    }

    static async getNote(req: Request, res: Response) {
        const { id } = req.params;
        console.log(id);

        const note = await NoteRecord.getOne(id, req.user.id);

        res.status(200).json({
            success: true,
            note,
        });
    }

    static async addNote(req: Request, res: Response) {
        const { text } = req.body;

        const noteIns = new NoteRecord({ text, userId: req.user.id });
        const id = await noteIns.insert();
        const noteObj = await NoteRecord.getOne(id, req.user.id);

        res.status(201).json({
            success: true,
            noteObj,
        });
    }

    static async deleteNote(req: Request, res: Response) {
        const id = req.params.id;

        await NoteRecord.delete(id);

        res.status(200).json({
            success: true,
            message: 'Data deleted',
        });
    }

    static async updateNote(req: Request, res: Response) {
        const { id, text } = req.body;

        const noteIns = new NoteRecord({ id, text });
        await noteIns.update();

        res.status(200).json({
            success: true,
            message: 'Data updated',
        });
    }

    static async signUp(req: Request, res: Response) {
        const { username, password, repeatPassword } = req.body;

        const user = new UserRecord({ username, password, repeatPassword });
        await user.signUp();

        res.status(200).json({
            success: true,
            message: 'Registered user',
        });
    }

    static async signIn(req: Request, res: Response) {
        const { username, password } = req.body;

        const user = await UserRecord.signIn(username, password);

        const payload = {
            id: user.id,
            username: user.username,
        };

        const token = jwt.sign(payload, ACCESS_TOKEN, { expiresIn: '1d' });

        res.status(200)
            .cookie('access_token', token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
            })
            .json({
                success: true,
                message: 'User logged in',
                cookie: token,
            });
    }

    static async logout(req: Request, res: Response) {
        res.status(200).clearCookie('access_token').json({
            success: true,
        });
    }
}
