module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    process.env.NODE_ENV === 'test'
      ? 'src/**/*.entity.ts'
      : 'dist/**/*.entity.js',
  ],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  synchronize: false,
  extra: {
    ssl:
      process.env.SSL_MODE === 'require'
        ? {
            rejectUnauthorized: false,
          }
        : false,
  },
};
