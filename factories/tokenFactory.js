const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class TokenFactory {
    static createAccessToken(user) {
        const roles = user.Roles.map((role) => ({ id: role.id, name: role.name }));
        const companies = [
            {
                companyId: user?.Employee?.Company?.companyId,
                companyName: user?.Employee?.Company?.companyName,
            },
        ];

        return jwt.sign(
            {
                iss: 'smartsme-api',
                aud: 'smartsme-client',
                sub: user.id.toString(),
                jti: crypto.randomUUID(),
                username: user.username,
                roles,
                companies,
                type: 'access',
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
        );
    }

    static createRefreshToken(userId) {
        return jwt.sign(
            {
                iss: 'smartsme-api',
                aud: 'smartsme-client',
                sub: userId.toString(),
                jti: crypto.randomUUID(),
                type: 'refresh',
            },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' },
        );
    }

    static verifyAccessToken(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }

    static verifyRefreshToken(token) {
        return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    }
}

module.exports = TokenFactory;
