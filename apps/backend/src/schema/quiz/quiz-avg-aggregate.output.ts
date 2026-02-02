import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class QuizAvgAggregate {

    @Field(() => Float, {nullable:true})
    quiz_type?: number;

    @Field(() => Float, {nullable:true})
    question_count?: number;

    @Field(() => Float, {nullable:true})
    total_questions?: number;

    @Field(() => Float, {nullable:true})
    total_points?: number;

    @Field(() => Float, {nullable:true})
    passing_score?: number;

    @Field(() => Float, {nullable:true})
    duration_minutes?: number;

    @Field(() => Float, {nullable:true})
    difficulty_level?: number;

    @Field(() => Float, {nullable:true})
    version?: number;

    @Field(() => Float, {nullable:true})
    max_attempts?: number;

    @Field(() => Float, {nullable:true})
    status?: number;
}
