const { Op } = require('sequelize');
const { User, Role, Employee, Company } = require('../models');

class UserRepository {
    async findByIdentifier(identifier) {
        return User.findOne({
            where: {
                [Op.or]: [
                    { email: identifier },
                    { username: identifier },
                    { mobile: identifier },
                ],
            },
            include: [
                {
                    model: Role,
                    attributes: ['id', 'name'],
                },
                {
                    model: Employee,
                    attributes: ['companyId'],
                    include: [
                        {
                            model: Company,
                            attributes: ['companyId', 'companyName'],
                        },
                    ],
                },
            ],
        });
    }

    async findByIdWithClaims(userId) {
        return User.findByPk(userId, {
            include: [
                {
                    model: Role,
                    attributes: ['id', 'name'],
                },
                {
                    model: Employee,
                    attributes: ['companyId'],
                    include: [
                        {
                            model: Company,
                            attributes: ['companyId', 'companyName'],
                        },
                    ],
                },
            ],
        });
    }

    async findById(userId) {
        return User.findByPk(userId);
    }

    async updatePassword(userId, hashedPassword) {
        const user = await User.findByPk(userId);
        if (!user) throw new Error('User not found');
        return user.update({ password: hashedPassword });
    }
}

module.exports = new UserRepository();
