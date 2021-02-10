const config = {
    development: {
        PORT: 3000,
        SALT_ROUNDS: 10,
        SECRET: 'somesecret',
        COOKIE_NAME: 'USER_SESSION'
    },
    production: {
        PORT: 443,
    }
}

module.exports = config[process.env.NODE_ENV.trim()];