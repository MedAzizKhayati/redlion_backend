import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
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
    }),
    TerminusModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController, HealthController],
  providers: [],
})
export class AppModule { }
