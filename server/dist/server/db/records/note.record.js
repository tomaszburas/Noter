var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { v4 as uuid } from 'uuid';
import { pool } from '../db.js';
import { ValidateError } from '../../middleware/errors.js';
export class NoteRecord {
    constructor(obj) {
        this.id = obj.id;
        this.text = obj.text;
        this.createdAt = obj.createdAt;
        this.userId = obj.userId;
        this.validate();
    }
    validate() {
        if (this.text.length < 3)
            throw new ValidateError('Note must be at least 3 characters long');
        if (this.text.length > 2500)
            throw new ValidateError('Note must be less than 2500 characters');
    }
    insert() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.id) {
                this.id = uuid();
            }
            yield pool.execute('INSERT INTO `notes` (`id`, `text`, `userId`) VALUES (:id, :text, :userId)', {
                id: this.id,
                text: this.text,
                userId: this.userId,
            });
            return this.id;
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.execute('UPDATE `notes` SET `text` = :text WHERE `id` = :id', {
                id: this.id,
                text: this.text,
            });
        });
    }
    static getOne(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [noteObj] = (yield pool.execute('SELECT * FROM `notes` WHERE `id` = :id AND `userId` = :userId', {
                id,
                userId,
            }));
            return noteObj.length === 0 ? null : new NoteRecord(noteObj[0]);
        });
    }
    static getAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [noteObj] = (yield pool.execute('SELECT * FROM `notes` WHERE `userId` = :userId ORDER BY `createdAt` DESC', { userId }));
            return noteObj.length === 0
                ? []
                : noteObj.map((note) => new NoteRecord(note));
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.execute('DELETE FROM `notes` WHERE `id` = :id', {
                id,
            });
        });
    }
}
//# sourceMappingURL=note.record.js.map