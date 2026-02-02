import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LessonWhereInput } from './lesson-where.input';
import { Type } from 'class-transformer';
import { LessonOrderByWithRelationInput } from './lesson-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';
import { Int } from '@nestjs/graphql';
import { LessonCountAggregateInput } from './lesson-count-aggregate.input';
import { LessonAvgAggregateInput } from './lesson-avg-aggregate.input';
import { LessonSumAggregateInput } from './lesson-sum-aggregate.input';
import { LessonMinAggregateInput } from './lesson-min-aggregate.input';
import { LessonMaxAggregateInput } from './lesson-max-aggregate.input';

@ArgsType()
export class LessonAggregateArgs {

    @Field(() => LessonWhereInput, {nullable:true})
    @Type(() => LessonWhereInput)
    where?: LessonWhereInput;

    @Field(() => [LessonOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<LessonOrderByWithRelationInput>;

    @Field(() => LessonWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => LessonCountAggregateInput, {nullable:true})
    _count?: LessonCountAggregateInput;

    @Field(() => LessonAvgAggregateInput, {nullable:true})
    _avg?: LessonAvgAggregateInput;

    @Field(() => LessonSumAggregateInput, {nullable:true})
    _sum?: LessonSumAggregateInput;

    @Field(() => LessonMinAggregateInput, {nullable:true})
    _min?: LessonMinAggregateInput;

    @Field(() => LessonMaxAggregateInput, {nullable:true})
    _max?: LessonMaxAggregateInput;
}
