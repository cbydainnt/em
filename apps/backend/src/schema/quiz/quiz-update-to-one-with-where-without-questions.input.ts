import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizWhereInput } from './quiz-where.input';
import { Type } from 'class-transformer';
import { QuizUpdateWithoutQuestionsInput } from './quiz-update-without-questions.input';

@InputType()
export class QuizUpdateToOneWithWhereWithoutQuestionsInput {

    @Field(() => QuizWhereInput, {nullable:true})
    @Type(() => QuizWhereInput)
    where?: QuizWhereInput;

    @Field(() => QuizUpdateWithoutQuestionsInput, {nullable:false})
    @Type(() => QuizUpdateWithoutQuestionsInput)
    data!: QuizUpdateWithoutQuestionsInput;
}
