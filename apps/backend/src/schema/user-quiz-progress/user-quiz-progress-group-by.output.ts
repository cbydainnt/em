import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { UserQuizProgressCountAggregate } from './user-quiz-progress-count-aggregate.output';
import { UserQuizProgressAvgAggregate } from './user-quiz-progress-avg-aggregate.output';
import { UserQuizProgressSumAggregate } from './user-quiz-progress-sum-aggregate.output';
import { UserQuizProgressMinAggregate } from './user-quiz-progress-min-aggregate.output';
import { UserQuizProgressMaxAggregate } from './user-quiz-progress-max-aggregate.output';

@ObjectType()
export class UserQuizProgressGroupBy {

    @Field(() => String, {nullable:false})
    progress_id!: string;

    @Field(() => String, {nullable:false})
    user_id!: string;

    @Field(() => String, {nullable:false})
    quiz_id!: string;

    @Field(() => String, {nullable:true})
    lesson_id?: string;

    @Field(() => String, {nullable:true})
    course_id?: string;

    @Field(() => Float, {nullable:true})
    score?: number;

    @Field(() => Float, {nullable:true})
    percentage?: number;

    @Field(() => Int, {nullable:false})
    total_questions!: number;

    @Field(() => Int, {nullable:false})
    correct_answers!: number;

    @Field(() => Int, {nullable:false})
    status!: number;

    @Field(() => Boolean, {nullable:false})
    passed!: boolean;

    @Field(() => Int, {nullable:true})
    time_spent?: number;

    @Field(() => Date, {nullable:false})
    started_at!: Date | string;

    @Field(() => Date, {nullable:true})
    completed_at?: Date | string;

    @Field(() => Int, {nullable:false})
    attempts!: number;

    @Field(() => Date, {nullable:false})
    created_at!: Date | string;

    @Field(() => Date, {nullable:false})
    updated_at!: Date | string;

    @Field(() => UserQuizProgressCountAggregate, {nullable:true})
    _count?: UserQuizProgressCountAggregate;

    @Field(() => UserQuizProgressAvgAggregate, {nullable:true})
    _avg?: UserQuizProgressAvgAggregate;

    @Field(() => UserQuizProgressSumAggregate, {nullable:true})
    _sum?: UserQuizProgressSumAggregate;

    @Field(() => UserQuizProgressMinAggregate, {nullable:true})
    _min?: UserQuizProgressMinAggregate;

    @Field(() => UserQuizProgressMaxAggregate, {nullable:true})
    _max?: UserQuizProgressMaxAggregate;
}
