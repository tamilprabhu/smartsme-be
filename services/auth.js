const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { User } = require("../models");

// Service functions
const authService = {

    // Login user by email/username + password
    login: async ({ identifier, password }) => {
        // Find user by email, username, or mobile
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: identifier },
                    { username: identifier },
                    { mobile: identifier }
                ]
            },
        });

        if (!user) throw new Error("User not found");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid password");

        // Generate tokens
        const accessToken = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
        );

        const refreshToken = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d" }
        );

        return { user, accessToken, refreshToken };
    },

    // Find user by ID
    getUserById: async (id) => {
        const user = await User.findByPk(id);
        return user;
    },

    // Optional: hash password before creating user
    hashPassword: async (password) => {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    },
};

module.exports = authService;
