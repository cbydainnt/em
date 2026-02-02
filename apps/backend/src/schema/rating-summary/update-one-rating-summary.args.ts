import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { RatingSummaryUpdateInput } from './rating-summary-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { RatingSummaryWhereUniqueInput } from './rating-summary-where-unique.input';

@ArgsType()
export class UpdateOneRatingSummaryArgs {

    @Field(() => RatingSummaryUpdateInput, {nullable:false})
    @Type(() => RatingSummaryUpdateInput)
    data!: RatingSummaryUpdateInput;

    @Field(() => RatingSummaryWhereUniqueInput, {nullable:false})
    @Type(() => RatingSummaryWhereUniqueInput)
    where!: Prisma.AtLeast<RatingSummaryWhereUniqueInput, 'id' | 'course_id'>;
}
