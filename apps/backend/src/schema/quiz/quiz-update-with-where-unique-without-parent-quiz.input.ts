import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { QuizWhereUniqueInput } from './quiz-where-unique.input';
import { Type } from 'class-transformer';
import { QuizUpdateWithoutParent_quizInput } from './quiz-update-without-parent-quiz.input';

@InputType()
export class QuizUpdateWithWhereUniqueWithoutParent_quizInput {

    @Field(() => QuizWhereUniqueInput, {nullable:false})
    @Type(() => QuizWhereUniqueInput)
    where!: Prisma.AtLeast<QuizWhereUniqueInput, 'quiz_id'>;

    @Field(() => QuizUpdateWithoutParent_quizInput, {nullable:false})
    @Type(() => QuizUpdateWithoutParent_quizInput)
    data!: QuizUpdateWithoutParent_quizInput;
}
