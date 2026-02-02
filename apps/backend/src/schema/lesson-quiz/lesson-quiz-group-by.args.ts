import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LessonQuizWhereInput } from './lesson-quiz-where.input';
import { Type } from 'class-transformer';
import { LessonQuizOrderByWithAggregationInput } from './lesson-quiz-order-by-with-aggregation.input';
import { LessonQuizScalarFieldEnum } from './lesson-quiz-scalar-field.enum';
import { LessonQuizScalarWhereWithAggregatesInput } from './lesson-quiz-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { LessonQuizCountAggregateInput } from './lesson-quiz-count-aggregate.input';
import { LessonQuizAvgAggregateInput } from './lesson-quiz-avg-aggregate.input';
import { LessonQuizSumAggregateInput } from './lesson-quiz-sum-aggregate.input';
import { LessonQuizMinAggregateInput } from './lesson-quiz-min-aggregate.input';
import { LessonQuizMaxAggregateInput } from './lesson-quiz-max-aggregate.input';

@ArgsType()
export class LessonQuizGroupByArgs {

    @Field(() => LessonQuizWhereInput, {nullable:true})
    @Type(() => LessonQuizWhereInput)
    where?: LessonQuizWhereInput;

    @Field(() => [LessonQuizOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<LessonQuizOrderByWithAggregationInput>;

    @Field(() => [LessonQuizScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof LessonQuizScalarFieldEnum>;

    @Field(() => LessonQuizScalarWhereWithAggregatesInput, {nullable:true})
    having?: LessonQuizScalarWhereWithAggregatesInput;

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
