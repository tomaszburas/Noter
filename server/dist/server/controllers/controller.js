var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import { NoteRecord } from '../db/records/note.record.js';
import { UserRecord } from '../db/records/user.record.js';
import { ACCESS_TOKEN } from '../config.js';
export class Controller {
    static getNotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const notes = yield NoteRecord.getAll(req.user.id);
            res.status(200).json({
                success: true,
                notes,
            });
        });
    }
    static getNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const note = yield NoteRecord.getOne(id, req.user.id);
            res.status(200).json({
                success: true,
                note,
            });
        });
    }
    static addNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { text } = req.body;
            const noteIns = new NoteRecord({ text, userId: req.user.id });
            const id = yield noteIns.insert();
            const noteObj = yield NoteRecord.getOne(id, req.user.id);
            res.status(201).json({
                success: true,
                noteObj,
            });
        });
    }
    static deleteNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield NoteRecord.delete(id);
            res.status(200).json({
                success: true,
                message: 'Data deleted',
            });
        });
    }
    static updateNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, text } = req.body;
            const noteIns = new NoteRecord({ id, text });
            yield noteIns.update();
            res.status(200).json({
                success: true,
                message: 'Data updated',
            });
        });
    }
    static signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, repeatPassword } = req.body;
            const user = new UserRecord({ username, password, repeatPassword });
            yield user.signUp();
            res.status(200).json({
                success: true,
                message: 'Registered user',
            });
        });
    }
    static signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const user = yield UserRecord.signIn(username, password);
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
        });
    }
    static logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).clearCookie('access_token').json({
                success: true,
            });
        });
    }
}
//# sourceMappingURL=controller.js.map