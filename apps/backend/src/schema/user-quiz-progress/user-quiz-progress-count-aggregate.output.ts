import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class UserQuizProgressCountAggregate {

    @Field(() => Int, {nullable:false})
    progress_id!: number;

    @Field(() => Int, {nullable:false})
    user_id!: number;

    @Field(() => Int, {nullable:false})
    quiz_id!: number;

    @Field(() => Int, {nullable:false})
    lesson_id!: number;

    @Field(() => Int, {nullable:false})
    course_id!: number;

    @Field(() => Int, {nullable:false})
    score!: number;

    @Field(() => Int, {nullable:false})
    percentage!: number;

    @Field(() => Int, {nullable:false})
    total_questions!: number;

    @Field(() => Int, {nullable:false})
    correct_answers!: number;

    @Field(() => Int, {nullable:false})
    status!: number;

    @Field(() => Int, {nullable:false})
    passed!: number;

    @Field(() => Int, {nullable:false})
    time_spent!: number;

    @Field(() => Int, {nullable:false})
    started_at!: number;

    @Field(() => Int, {nullable:false})
    completed_at!: number;

    @Field(() => Int, {nullable:false})
    attempts!: number;

    @Field(() => Int, {nullable:false})
    created_at!: number;

    @Field(() => Int, {nullable:false})
    updated_at!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
