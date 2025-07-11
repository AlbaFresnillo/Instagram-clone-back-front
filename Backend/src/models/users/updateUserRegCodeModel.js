import { getPool } from '../../db/getPool.js';
import jwt from 'jsonwebtoken';
import { notFoundError } from '../../services/errorService.js';

const updateUserRegCodeModel = async (registrationCode) => {
    const pool = await getPool();

    const [user] = await pool.query(
        `
            SELECT id FROM users WHERE registrationCode = ?
        `,
        [registrationCode]
    );

    if (!user.length) {
        notFoundError('usuario');
    }

    await pool.query(
        `
            UPDATE users
            SET active=true, registrationCode=null
            WHERE registrationCode = ?
        `,
        [registrationCode]
    );

    // Obtén información del usuario activado
    const [activatedUser] = await pool.query(
        `
            SELECT id, role
            FROM users
            WHERE id = ?
        `,
        [user[0].id]
    );

    // Genera un nuevo token
    const token = jwt.sign({
        id: activatedUser.id,
        role: activatedUser.role
    }, process.env.SECRET, {
        expiresIn: '3d'
    });

    return token;
};

export default updateUserRegCodeModel;
