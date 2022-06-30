import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PredictMetaDto } from "./dto/predict-meta.dto";
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from "rxjs";
import { Repository } from "typeorm";
import { User } from "src/user/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class MlApiService {

    constructor(
        private readonly httpService: HttpService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async predictMeta(data: PredictMetaDto, user: User) {
        if(user.requestsRemaining <= 0) {
            throw new UnauthorizedException("You have no requests remaining! Please contact us.");
        }

        const results = (
            await firstValueFrom(
                this.httpService.post(
                    process.env.THIRD_PARTY_API + 'FB_Prediction',
                    data
                )
            )
        ).data;

        this.userRepository.update(user.id, {
            requestsRemaining: user.requestsRemaining - 1
        });

        return results;
    }
}