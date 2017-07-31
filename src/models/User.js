import {} from 'dotenv/config';
import pool from '../db';

class User {
    constructor(data) {
        if (!data) return;

        this.data = {
            id: data.id,
            token: data.token,
            username: data.username,
            email: data.email,
            isAdmin: data.isAdmin,
        };
    }
}

async function findById(id, ctx) {
    try {
        let userData = await pool.query(
            `
            SELECT id, token, username, email, isAdmin
            FROM koa_vue_notes_users
            WHERE userId = ?
            `,
            [id]
        );
        return userData[0];
    } catch (error) {
        ctx.throw(500, 'SERVER_ERROR');
    }
}

export { User, findById };