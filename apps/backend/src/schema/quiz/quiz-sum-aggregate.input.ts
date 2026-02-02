import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class QuizSumAggregateInput {

    @Field(() => Boolean, {nullable:true})
    quiz_type?: true;

    @Field(() => Boolean, {nullable:true})
    question_count?: true;

    @Field(() => Boolean, {nullable:true})
    total_questions?: true;

    @Field(() => Boolean, {nullable:true})
    total_points?: true;

    @Field(() => Boolean, {nullable:true})
    passing_score?: true;

    @Field(() => Boolean, {nullable:true})
    duration_minutes?: true;

    @Field(() => Boolean, {nullable:true})
    difficulty_level?: true;

    @Field(() => Boolean, {nullable:true})
    version?: true;

    @Field(() => Boolean, {nullable:true})
    max_attempts?: true;

    @Field(() => Boolean, {nullable:true})
    status?: true;
}
