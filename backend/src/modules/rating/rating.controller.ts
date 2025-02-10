import { Body, Injectable, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RatingService } from './rating.service';
import { AuthGuard } from 'src/middlewares/guards/auth.guard';
import { GetPayload } from 'src/middlewares/decorators/get-payload.decorator';
import { RatingCreateDto } from './rating.create.dto';
import { UserPayloadDto } from '../user/DTOs/user.payload.dto';

@Injectable()
@ApiTags('Rating')
export class RatingController {
    constructor(private readonly ratingService: RatingService) {}

    @AuthGuard()
    @Post()
    async postRating(@Body() body: RatingCreateDto, @GetPayload() user: UserPayloadDto) {
        return await this.ratingService.create(body, user.id);
    }
}
