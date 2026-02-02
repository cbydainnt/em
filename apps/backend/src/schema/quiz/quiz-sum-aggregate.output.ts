import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class QuizSumAggregate {

    @Field(() => Int, {nullable:true})
    quiz_type?: number;

    @Field(() => Int, {nullable:true})
    question_count?: number;

    @Field(() => Int, {nullable:true})
    total_questions?: number;

    @Field(() => Int, {nullable:true})
    total_points?: number;

    @Field(() => Int, {nullable:true})
    passing_score?: number;

    @Field(() => Int, {nullable:true})
    duration_minutes?: number;

    @Field(() => Int, {nullable:true})
    difficulty_level?: number;

    @Field(() => Int, {nullable:true})
    version?: number;

    @Field(() => Int, {nullable:true})
    max_attempts?: number;

    @Field(() => Int, {nullable:true})
    status?: number;
}
