import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class UserQuizProgressCreateManyUserInput {

    @Field(() => String, {nullable:true})
    progress_id?: string;

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

    @Field(() => Int, {nullable:true})
    total_questions?: number;

    @Field(() => Int, {nullable:true})
    correct_answers?: number;

    @Field(() => Int, {nullable:true})
    status?: number;

    @Field(() => Boolean, {nullable:true})
    passed?: boolean;

    @Field(() => Int, {nullable:true})
    time_spent?: number;

    @Field(() => Date, {nullable:true})
    started_at?: Date | string;

    @Field(() => Date, {nullable:true})
    completed_at?: Date | string;

    @Field(() => Int, {nullable:true})
    attempts?: number;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;
}
