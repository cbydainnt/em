import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { RatingSummaryWhereUniqueInput } from './rating-summary-where-unique.input';
import { Type } from 'class-transformer';
import { RatingSummaryCreateInput } from './rating-summary-create.input';
import { RatingSummaryUpdateInput } from './rating-summary-update.input';

@ArgsType()
export class UpsertOneRatingSummaryArgs {

    @Field(() => RatingSummaryWhereUniqueInput, {nullable:false})
    @Type(() => RatingSummaryWhereUniqueInput)
    where!: Prisma.AtLeast<RatingSummaryWhereUniqueInput, 'id' | 'course_id'>;

    @Field(() => RatingSummaryCreateInput, {nullable:false})
    @Type(() => RatingSummaryCreateInput)
    create!: RatingSummaryCreateInput;

    @Field(() => RatingSummaryUpdateInput, {nullable:false})
    @Type(() => RatingSummaryUpdateInput)
    update!: RatingSummaryUpdateInput;
}
