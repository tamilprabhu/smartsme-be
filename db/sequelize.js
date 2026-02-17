const { Sequelize } = require("sequelize");
const moment = require("moment");

const getUtcNow = () => moment.utc().toDate();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        dialect: "mysql",
        logging: false,
        define: {
            hooks: {
                beforeSave: (instance) => {
                    const nowUtc = getUtcNow();
                    if (instance?.rawAttributes?.createdAt && instance.isNewRecord && !instance.getDataValue("createdAt")) {
                        instance.setDataValue("createdAt", nowUtc);
                    }
                    if (instance?.rawAttributes?.updatedAt) {
                        instance.setDataValue("updatedAt", nowUtc);
                    }
                },
                beforeBulkCreate: (instances) => {
                    const nowUtc = getUtcNow();
                    instances.forEach((instance) => {
                        if (instance?.rawAttributes?.createdAt && !instance.getDataValue("createdAt")) {
                            instance.setDataValue("createdAt", nowUtc);
                        }
                        if (instance?.rawAttributes?.updatedAt) {
                            instance.setDataValue("updatedAt", nowUtc);
                        }
                    });
                },
                beforeBulkUpdate: (options) => {
                    options.attributes = options.attributes || {};
                    options.attributes.updatedAt = getUtcNow();
                    if (Array.isArray(options.fields) && !options.fields.includes("updatedAt")) {
                        options.fields.push("updatedAt");
                    }
                }
            }
        }
    }
);

module.exports = sequelize;
