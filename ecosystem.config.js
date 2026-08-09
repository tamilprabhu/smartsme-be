module.exports = {
    apps: [
        {
            name: 'smartsme-be/do',
            script: 'node',
            args: ['-r', 'newrelic', 'bin/www'],
            env: {
                NODE_ENV: 'production',
                PORT: 80,
                DB_HOST: '127.0.0.1',
                DB_NAME: 'smartsme',
                DB_USER: 'smartsmeusr',
                DB_PASS: 'sm@rtsmepwd',
            },
        },
    ],
};
