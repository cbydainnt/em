import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { RatingSummaryWhereUniqueInput } from './rating-summary-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteOneRatingSummaryArgs {

    @Field(() => RatingSummaryWhereUniqueInput, {nullable:false})
    @Type(() => RatingSummaryWhereUniqueInput)
    where!: Prisma.AtLeast<RatingSummaryWhereUniqueInput, 'id' | 'course_id'>;
}
