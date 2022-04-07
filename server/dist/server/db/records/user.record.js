var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { pool } from '../db.js';
import { ValidateError } from '../../middleware/errors.js';
import { validatePassword } from '../../utils/validatePassword.js';
export class UserRecord {
    constructor(obj) {
        this.id = obj.id;
        this.username = obj.username.trim();
        this.password = obj.password;
        this.repeatPassword = obj.repeatPassword;
    }
    signUp() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.username.length < 3)
                throw new ValidateError('Username must be longer than 3 characters');
            if (!validatePassword(this.password))
                throw new ValidateError('Password must contain min. 5 characters, one digit and one upper case character');
            if (this.password !== this.repeatPassword)
                throw new ValidateError('The entered passwords differ from each other');
            if (!this.id) {
                this.id = uuid();
            }
            this.password = yield bcrypt.hash(this.password, 10);
            yield pool.execute('INSERT INTO `users` (`id`, `username`, `password`) VALUES (:id, :username, :password)', {
                id: this.id,
                username: this.username,
                password: this.password,
            });
            return this.id;
        });
    }
    static signIn(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user] = (yield pool.execute('SELECT * FROM `users` WHERE `username` = :username', { username }));
            if (user.length === 0)
                throw new ValidateError('User not found');
            const match = yield bcrypt.compare(password, user[0].password);
            if (!match)
                throw new ValidateError('Password not valid');
            return {
                id: user[0].id,
                username: user[0].username,
            };
        });
    }
    static getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user] = (yield pool.execute('SELECT * FROM `users` WHERE `id` = :id', { id }));
            return user.length !== 0
                ? { id: user[0].id, username: user[0].username }
                : null;
        });
    }
}
//# sourceMappingURL=user.record.js.map