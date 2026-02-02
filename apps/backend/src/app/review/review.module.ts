import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';

@Module({
  imports: [],
  providers: [ReviewService],
  exports: [ReviewService],
  controllers: [ReviewController],
})
export class ReviewModule {}
