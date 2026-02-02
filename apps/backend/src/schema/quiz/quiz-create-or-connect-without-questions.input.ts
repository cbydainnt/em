import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { QuizWhereUniqueInput } from './quiz-where-unique.input';
import { Type } from 'class-transformer';
import { QuizCreateWithoutQuestionsInput } from './quiz-create-without-questions.input';

@InputType()
export class QuizCreateOrConnectWithoutQuestionsInput {

    @Field(() => QuizWhereUniqueInput, {nullable:false})
    @Type(() => QuizWhereUniqueInput)
    where!: Prisma.AtLeast<QuizWhereUniqueInput, 'quiz_id'>;

    @Field(() => QuizCreateWithoutQuestionsInput, {nullable:false})
    @Type(() => QuizCreateWithoutQuestionsInput)
    create!: QuizCreateWithoutQuestionsInput;
}
