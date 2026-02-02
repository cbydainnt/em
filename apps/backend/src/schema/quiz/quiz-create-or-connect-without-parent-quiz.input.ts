import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { QuizWhereUniqueInput } from './quiz-where-unique.input';
import { Type } from 'class-transformer';
import { QuizCreateWithoutParent_quizInput } from './quiz-create-without-parent-quiz.input';

@InputType()
export class QuizCreateOrConnectWithoutParent_quizInput {

    @Field(() => QuizWhereUniqueInput, {nullable:false})
    @Type(() => QuizWhereUniqueInput)
    where!: Prisma.AtLeast<QuizWhereUniqueInput, 'quiz_id'>;

    @Field(() => QuizCreateWithoutParent_quizInput, {nullable:false})
    @Type(() => QuizCreateWithoutParent_quizInput)
    create!: QuizCreateWithoutParent_quizInput;
}
