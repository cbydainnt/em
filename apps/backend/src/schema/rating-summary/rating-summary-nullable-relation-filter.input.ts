import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RatingSummaryWhereInput } from './rating-summary-where.input';

@InputType()
export class RatingSummaryNullableRelationFilter {

    @Field(() => RatingSummaryWhereInput, {nullable:true})
    is?: RatingSummaryWhereInput;

    @Field(() => RatingSummaryWhereInput, {nullable:true})
    isNot?: RatingSummaryWhereInput;
}
