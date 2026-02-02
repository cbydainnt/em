import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizUpdateWithoutQuestionsInput } from './quiz-update-without-questions.input';
import { Type } from 'class-transformer';
import { QuizCreateWithoutQuestionsInput } from './quiz-create-without-questions.input';
import { QuizWhereInput } from './quiz-where.input';

@InputType()
export class QuizUpsertWithoutQuestionsInput {

    @Field(() => QuizUpdateWithoutQuestionsInput, {nullable:false})
    @Type(() => QuizUpdateWithoutQuestionsInput)
    update!: QuizUpdateWithoutQuestionsInput;

    @Field(() => QuizCreateWithoutQuestionsInput, {nullable:false})
    @Type(() => QuizCreateWithoutQuestionsInput)
    create!: QuizCreateWithoutQuestionsInput;

    @Field(() => QuizWhereInput, {nullable:true})
    @Type(() => QuizWhereInput)
    where?: QuizWhereInput;
}
