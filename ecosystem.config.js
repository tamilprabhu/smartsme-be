module.exports = {
    apps: [{
        name: "smartsme-dev",
        script: "npm",
        args: "run dev",
        env: {
            DB_HOST: "172.17.0.2",
            DB_NAME: "smartsme",
            DB_USER: "smartsmeusr",
            DB_PASS: "sm@rtsmepwd"
        }
    }]
};
