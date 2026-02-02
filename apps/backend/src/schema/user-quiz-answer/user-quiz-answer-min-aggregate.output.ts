import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class UserQuizAnswerMinAggregate {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:true})
    progress_id?: string;

    @Field(() => String, {nullable:true})
    question_id?: string;

    @Field(() => String, {nullable:true})
    answer_text?: string;

    @Field(() => Boolean, {nullable:true})
    is_correct?: boolean;

    @Field(() => Float, {nullable:true})
    points_earned?: number;

    @Field(() => Int, {nullable:true})
    time_spent?: number;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;
}
