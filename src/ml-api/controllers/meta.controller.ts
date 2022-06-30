import {
  Controller,
  UseGuards,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
  Body,
} from '@nestjs/common';
import { AuthUser } from 'src/user/user.decorator';
import { User } from 'src/user/user.entity';

import { JWTAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { PredictMetaDto } from '../dto/predict-meta.dto';
import { MlApiService } from '../ml-api.service';

@Controller('meta')
@UseGuards(JWTAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class MetaController {
  constructor(private readonly mlApiService: MlApiService) { }

  @Post('predict')
  predict(
    @Body() data: any,
    @AuthUser() user: User,
  ) {    
    return this.mlApiService.predictMeta(data, user);
  }

}
