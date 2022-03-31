import bcrypt from "bcrypt";
import {v4 as uuid} from 'uuid';

import {pool} from '../db.js';
import {ValidateError} from "../../middleware/errors.js";
import {validatePassword} from "../../utils/validatePassword.js";

export class UserRecord {
    constructor(obj) {
        this.id = obj.id;
        this.username = obj.username.trim();
        this.password = obj.password;
        this.repeatPassword = obj.repeatPassword;
    }

    async signUp() {
        if (this.username.length < 3) throw new ValidateError('Username must be longer than 3 characters');
        if (!validatePassword(this.password)) throw new ValidateError('Password must contain min. 5 characters, one digit and one upper case character');
        if (this.password !== this.repeatPassword) throw new ValidateError('The entered passwords differ from each other');

        if (!this.id) {
            this.id = uuid();
        }

        this.password = await bcrypt.hash(this.password, 10);

        await pool.execute("INSERT INTO `users` (`id`, `username`, `password`) VALUES (:id, :username, :password)", {
            id: this.id,
            username: this.username,
            password: this.password
        })

        return this.id
    }

    static async signIn({username, password}) {
        const [user] = await pool.execute("SELECT * FROM `users` WHERE `username` = :username", {username});
        if (user.length === 0) throw new ValidateError('User not found');

        const match = await bcrypt.compare(password, user[0].password);
        if (!match) throw new ValidateError('Password not valid');

        return {
            id: user[0].id,
            username: user[0].username
        }
    }

    static async getUser(id) {
        const [user] = await pool.execute("SELECT * FROM `users` WHERE `id` = :id", {id});

        return user.length !== 0 ? {id: user[0].id, username: user[0].username} : null;
    }
}
