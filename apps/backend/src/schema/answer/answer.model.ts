import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Question } from '../question/question.model';

@ObjectType()
export class Answer {

    @Field(() => ID, {nullable:false})
    answer_id!: string;

    @Field(() => String, {nullable:false})
    question_id!: string;

    @Field(() => String, {nullable:false})
    answer_text!: string;

    @Field(() => String, {nullable:true})
    answer_image!: string | null;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    is_correct!: boolean;

    @Field(() => Int, {nullable:false,defaultValue:0})
    order!: number;

    @Field(() => String, {nullable:true})
    match_key!: string | null;

    @Field(() => Int, {nullable:true})
    blank_position!: number | null;

    @Field(() => Question, {nullable:false})
    question?: Question;
}
