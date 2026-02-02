import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { RatingSummaryWhereInput } from './rating-summary-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyRatingSummaryArgs {

    @Field(() => RatingSummaryWhereInput, {nullable:true})
    @Type(() => RatingSummaryWhereInput)
    where?: RatingSummaryWhereInput;
}
