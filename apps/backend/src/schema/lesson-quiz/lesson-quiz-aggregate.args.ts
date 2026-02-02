import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LessonQuizWhereInput } from './lesson-quiz-where.input';
import { Type } from 'class-transformer';
import { LessonQuizOrderByWithRelationInput } from './lesson-quiz-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { LessonQuizWhereUniqueInput } from './lesson-quiz-where-unique.input';
import { Int } from '@nestjs/graphql';
import { LessonQuizCountAggregateInput } from './lesson-quiz-count-aggregate.input';
import { LessonQuizAvgAggregateInput } from './lesson-quiz-avg-aggregate.input';
import { LessonQuizSumAggregateInput } from './lesson-quiz-sum-aggregate.input';
import { LessonQuizMinAggregateInput } from './lesson-quiz-min-aggregate.input';
import { LessonQuizMaxAggregateInput } from './lesson-quiz-max-aggregate.input';

@ArgsType()
export class LessonQuizAggregateArgs {

    @Field(() => LessonQuizWhereInput, {nullable:true})
    @Type(() => LessonQuizWhereInput)
    where?: LessonQuizWhereInput;

    @Field(() => [LessonQuizOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<LessonQuizOrderByWithRelationInput>;

    @Field(() => LessonQuizWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<LessonQuizWhereUniqueInput, 'id' | 'lesson_id_quiz_id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => LessonQuizCountAggregateInput, {nullable:true})
    _count?: LessonQuizCountAggregateInput;

    @Field(() => LessonQuizAvgAggregateInput, {nullable:true})
    _avg?: LessonQuizAvgAggregateInput;

    @Field(() => LessonQuizSumAggregateInput, {nullable:true})
    _sum?: LessonQuizSumAggregateInput;

    @Field(() => LessonQuizMinAggregateInput, {nullable:true})
    _min?: LessonQuizMinAggregateInput;

    @Field(() => LessonQuizMaxAggregateInput, {nullable:true})
    _max?: LessonQuizMaxAggregateInput;
}
