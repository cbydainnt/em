import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { QuizWhereUniqueInput } from './quiz-where-unique.input';
import { Type } from 'class-transformer';
import { QuizCreateWithoutQuiz_lessonsInput } from './quiz-create-without-quiz-lessons.input';

@InputType()
export class QuizCreateOrConnectWithoutQuiz_lessonsInput {

    @Field(() => QuizWhereUniqueInput, {nullable:false})
    @Type(() => QuizWhereUniqueInput)
    where!: Prisma.AtLeast<QuizWhereUniqueInput, 'quiz_id'>;

    @Field(() => QuizCreateWithoutQuiz_lessonsInput, {nullable:false})
    @Type(() => QuizCreateWithoutQuiz_lessonsInput)
    create!: QuizCreateWithoutQuiz_lessonsInput;
}
