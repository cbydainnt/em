import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { LessonQuizCountAggregate } from './lesson-quiz-count-aggregate.output';
import { LessonQuizAvgAggregate } from './lesson-quiz-avg-aggregate.output';
import { LessonQuizSumAggregate } from './lesson-quiz-sum-aggregate.output';
import { LessonQuizMinAggregate } from './lesson-quiz-min-aggregate.output';
import { LessonQuizMaxAggregate } from './lesson-quiz-max-aggregate.output';

@ObjectType()
export class LessonQuizGroupBy {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    lesson_id!: string;

    @Field(() => String, {nullable:false})
    quiz_id!: string;

    @Field(() => Int, {nullable:false})
    order!: number;

    @Field(() => Date, {nullable:false})
    created_at!: Date | string;

    @Field(() => LessonQuizCountAggregate, {nullable:true})
    _count?: LessonQuizCountAggregate;

    @Field(() => LessonQuizAvgAggregate, {nullable:true})
    _avg?: LessonQuizAvgAggregate;

    @Field(() => LessonQuizSumAggregate, {nullable:true})
    _sum?: LessonQuizSumAggregate;

    @Field(() => LessonQuizMinAggregate, {nullable:true})
    _min?: LessonQuizMinAggregate;

    @Field(() => LessonQuizMaxAggregate, {nullable:true})
    _max?: LessonQuizMaxAggregate;
}
