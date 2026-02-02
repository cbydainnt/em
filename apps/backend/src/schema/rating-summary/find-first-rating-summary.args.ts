import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { RatingSummaryWhereInput } from './rating-summary-where.input';
import { Type } from 'class-transformer';
import { RatingSummaryOrderByWithRelationInput } from './rating-summary-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { RatingSummaryWhereUniqueInput } from './rating-summary-where-unique.input';
import { Int } from '@nestjs/graphql';
import { RatingSummaryScalarFieldEnum } from './rating-summary-scalar-field.enum';

@ArgsType()
export class FindFirstRatingSummaryArgs {

    @Field(() => RatingSummaryWhereInput, {nullable:true})
    @Type(() => RatingSummaryWhereInput)
    where?: RatingSummaryWhereInput;

    @Field(() => [RatingSummaryOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<RatingSummaryOrderByWithRelationInput>;

    @Field(() => RatingSummaryWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<RatingSummaryWhereUniqueInput, 'id' | 'course_id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [RatingSummaryScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof RatingSummaryScalarFieldEnum>;
}
