module.exports = {
    apps: [{
        name: "smartsme-dev",
        script: "node",
        args: "bin/www",
        env: {
            NODE_ENV: "production",
            PORT: 8080,
            DB_HOST: "172.17.0.2",
            DB_NAME: "smartsme",
            DB_USER: "smartsmeusr",
            DB_PASS: "sm@rtsmepwd"
        }
    }]
};
