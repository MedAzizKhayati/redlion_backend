import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TerminusModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController, HealthController],
  providers: [],
})
export class AppModule {}
