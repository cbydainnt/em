import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserQuizAnswerCreateselected_answer_idsInput } from './user-quiz-answer-createselected-answer-ids.input';
import { Float } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { UserQuizProgressCreateNestedOneWithoutAnswersInput } from '../user-quiz-progress/user-quiz-progress-create-nested-one-without-answers.input';

@InputType()
export class UserQuizAnswerCreateWithoutQuestionInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => UserQuizAnswerCreateselected_answer_idsInput, {nullable:true})
    selected_answer_ids?: UserQuizAnswerCreateselected_answer_idsInput;

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

    @Field(() => UserQuizProgressCreateNestedOneWithoutAnswersInput, {nullable:false})
    progress!: UserQuizProgressCreateNestedOneWithoutAnswersInput;
}
