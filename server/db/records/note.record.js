import {v4 as uuid} from 'uuid';

import {pool} from '../db.js';
import {ValidateError} from "../../middleware/errors.js";

export class NoteRecord {
    constructor(obj) {
        this.id = obj.id;
        this.note = obj.note;
        this.createdAt = obj.createdAt;
        this.userId = obj.userId;

        this.validate();
    }

    validate() {
        if (this.note.length < 3) throw new ValidateError('Note must be at least 3 characters long');
        if (this.note.length > 2500) throw new ValidateError('Note must be less than 2500 characters');
    }

    async insert() {
        if (!this.id) {
            this.id = uuid();
        }

        await pool.execute("INSERT INTO `notes` (`id`, `note`, `userId`) VALUES (:id, :note, :userId)", {
            id: this.id,
            note: this.note,
            userId: this.userId
        })

        return this.id
    }

    async update() {
        await pool.execute("UPDATE `notes` SET `note` = :note WHERE `id` = :id", {
            id: this.id,
            note: this.note
        })
    }

    static async getOne(id, userId) {
        const [noteObj] = await pool.execute("SELECT * FROM `notes` WHERE `id` = :id AND `userId` = :userId", {
            id,
            userId
        })

        return noteObj.length === 0 ? null : new NoteRecord(noteObj[0]);
    }

    static async getAll(userId) {
        const [noteObj] = await pool.execute("SELECT * FROM `notes` WHERE `userId` = :userId ORDER BY `createdAt` DESC", {userId});

        return noteObj.length === 0 ? [] : noteObj.map(note => new NoteRecord(note));
    }

    static async delete(id) {
        await pool.execute("DELETE FROM `notes` WHERE `id` = :id", {
            id,
        })
    }
}
