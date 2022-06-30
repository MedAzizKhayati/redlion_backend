import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { MetaController } from './controllers/meta.controller';
import { MlApiService } from './ml-api.service';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    HttpModule,
  ],
  controllers: [MetaController],
  providers: [MlApiService],
})
export class MlApiModule { }
