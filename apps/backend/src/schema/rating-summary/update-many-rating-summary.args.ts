import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { RatingSummaryUpdateManyMutationInput } from './rating-summary-update-many-mutation.input';
import { Type } from 'class-transformer';
import { RatingSummaryWhereInput } from './rating-summary-where.input';

@ArgsType()
export class UpdateManyRatingSummaryArgs {

    @Field(() => RatingSummaryUpdateManyMutationInput, {nullable:false})
    @Type(() => RatingSummaryUpdateManyMutationInput)
    data!: RatingSummaryUpdateManyMutationInput;

    @Field(() => RatingSummaryWhereInput, {nullable:true})
    @Type(() => RatingSummaryWhereInput)
    where?: RatingSummaryWhereInput;
}
