import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { RatingSummaryCreateManyInput } from './rating-summary-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyRatingSummaryArgs {

    @Field(() => [RatingSummaryCreateManyInput], {nullable:false})
    @Type(() => RatingSummaryCreateManyInput)
    data!: Array<RatingSummaryCreateManyInput>;
}
