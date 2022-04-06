import { v4 as uuid } from 'uuid';
import { FieldPacket } from 'mysql2';

import { pool } from '../db';
import { ValidateError } from '../../middleware/errors';
import { NoteRecordEntity } from '../../types';

type NoteRecordResults = [NoteRecord[], FieldPacket[]];

export class NoteRecord implements NoteRecordEntity {
    id?: string;
    text: string;
    createdAt?: Date;
    userId?: string;

    constructor(obj: NoteRecordEntity) {
        this.id = obj.id;
        this.text = obj.text;
        this.createdAt = obj.createdAt;
        this.userId = obj.userId;

        this.validate();
    }

    validate(): void {
        if (this.text.length < 3)
            throw new ValidateError('Note must be at least 3 characters long');
        if (this.text.length > 2500)
            throw new ValidateError('Note must be less than 2500 characters');
    }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        }

        await pool.execute(
            'INSERT INTO `notes` (`id`, `text`, `userId`) VALUES (:id, :text, :userId)',
            {
                id: this.id,
                text: this.text,
                userId: this.userId,
            }
        );

        return this.id;
    }

    async update(): Promise<void> {
        await pool.execute(
            'UPDATE `notes` SET `text` = :text WHERE `id` = :id',
            {
                id: this.id,
                text: this.text,
            }
        );
    }

    static async getOne(
        id: string,
        userId: string
    ): Promise<NoteRecord | null> {
        const [noteObj] = (await pool.execute(
            'SELECT * FROM `notes` WHERE `id` = :id AND `userId` = :userId',
            {
                id,
                userId,
            }
        )) as NoteRecordResults;

        return noteObj.length === 0 ? null : new NoteRecord(noteObj[0]);
    }

    static async getAll(userId: string): Promise<[] | NoteRecord[]> {
        const [noteObj] = (await pool.execute(
            'SELECT * FROM `notes` WHERE `userId` = :userId ORDER BY `createdAt` DESC',
            { userId }
        )) as NoteRecordResults;

        return noteObj.length === 0
            ? []
            : noteObj.map((note) => new NoteRecord(note));
    }

    static async delete(id: string): Promise<void> {
        await pool.execute('DELETE FROM `notes` WHERE `id` = :id', {
            id,
        });
    }
}
