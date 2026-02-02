import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { RatingSummaryCreateInput } from './rating-summary-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneRatingSummaryArgs {

    @Field(() => RatingSummaryCreateInput, {nullable:false})
    @Type(() => RatingSummaryCreateInput)
    data!: RatingSummaryCreateInput;
}
