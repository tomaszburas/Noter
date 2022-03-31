import {NoteRecord} from "../db/records/note.record.js";
import {UserRecord} from "../db/records/user.record.js";
import jwt from "jsonwebtoken";
import {ACCESS_TOKEN} from "../config.js";

export class Controller {
    static async getNotes(req, res) {
        const notes = await NoteRecord.getAll(req.user.id);

        res
            .status(200)
            .json({
                success: true,
                notes
            })
    }

    static async getNote(req, res) {
        const id = req.params.id;

        const note = await NoteRecord.getOne(id, req.user.id);

        res
            .status(200)
            .json({
                success: true,
                note
            })
    }

    static async addNote(req, res) {
        const {note} = req.body;

        const noteIns = new NoteRecord({note, userId: req.user.id});
        const id = await noteIns.insert();
        const noteObj = await NoteRecord.getOne(id, req.user.id);

        res
            .status(201)
            .json({
                success: true,
                noteObj
            })
    }

    static async deleteNote(req, res) {
        const id = req.params.id;

        await NoteRecord.delete(id);

        res
            .status(200)
            .json({
                success: true,
                message: 'Data deleted'
            })
    }

    static async updateNote(req, res) {
        const {id, note} = req.body;

        const noteIns = new NoteRecord({id, note});
        await noteIns.update();

        res
            .status(200)
            .json({
                success: true,
                message: 'Data updated'
            })
    }

    static async signUp(req, res) {
        const {username, password, repeatPassword} = req.body;

        const user = new UserRecord({username, password, repeatPassword});
        await user.signUp();

        res
            .status(200)
            .json({
                success: true,
                message: 'Registered user'
            })
    }

    static async signIn(req, res) {
        const {username, password} = req.body;

        const user = await UserRecord.signIn({username, password});

        const payload = {
            id: user.id,
            username: user.username,
        }

        const token = jwt.sign(payload, ACCESS_TOKEN, {expiresIn: "1d"});

        res
            .status(200)
            .json({
                success: true,
                message: 'User logged in',
                token: `Bearer ${token}`,
            })
    }
}
