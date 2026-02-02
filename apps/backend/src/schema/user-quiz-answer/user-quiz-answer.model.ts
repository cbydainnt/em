import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { UserQuizProgress } from '../user-quiz-progress/user-quiz-progress.model';
import { Question } from '../question/question.model';

@ObjectType()
export class UserQuizAnswer {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    progress_id!: string;

    @Field(() => String, {nullable:false})
    question_id!: string;

    @Field(() => [String], {nullable:true})
    selected_answer_ids!: Array<string>;

    @Field(() => String, {nullable:true})
    answer_text!: string | null;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    is_correct!: boolean;

    @Field(() => Float, {nullable:false,defaultValue:0})
    points_earned!: number;

    @Field(() => Int, {nullable:true})
    time_spent!: number | null;

    @Field(() => Date, {nullable:false})
    created_at!: Date;

    @Field(() => UserQuizProgress, {nullable:false})
    progress?: UserQuizProgress;

    @Field(() => Question, {nullable:false})
    question?: Question;
}
