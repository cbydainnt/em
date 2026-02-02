import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { QuestionCreateNestedOneWithoutAnswersInput } from '../question/question-create-nested-one-without-answers.input';

@InputType()
export class AnswerCreateInput {

    @Field(() => String, {nullable:true})
    answer_id?: string;

    @Field(() => String, {nullable:false})
    answer_text!: string;

    @Field(() => String, {nullable:true})
    answer_image?: string;

    @Field(() => Boolean, {nullable:true})
    is_correct?: boolean;

    @Field(() => Int, {nullable:true})
    order?: number;

    @Field(() => String, {nullable:true})
    match_key?: string;

    @Field(() => Int, {nullable:true})
    blank_position?: number;

    @Field(() => QuestionCreateNestedOneWithoutAnswersInput, {nullable:false})
    question!: QuestionCreateNestedOneWithoutAnswersInput;
}
