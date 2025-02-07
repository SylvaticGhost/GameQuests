import * as bcrypt from 'bcrypt';
import { HashedPassword } from './DTOs/hashed-password';

export class PasswordHelper {
    static hashPassword(password: string): HashedPassword {
        if (!password || password.length === 0)
            throw new Error('Password is required');

        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);

        return { hash, salt };
    }
    static async comparePasswords(
        password: string,
        hashedPassword: HashedPassword,
    ): Promise<boolean> {
        if (!password || password.length === 0)
            throw new Error('Password is required');

        if (!hashedPassword) throw new Error('Hashed password is not provided');

        if (!hashedPassword.hash || hashedPassword.hash.length === 0)
            throw new Error('Hashed password is not provided');

        if (!hashedPassword.salt || hashedPassword.salt.length === 0)
            throw new Error('Hashed password is not provided');

        return bcrypt.compare(password, hashedPassword.hash);
    }
}
