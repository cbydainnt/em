import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { QuizWhereUniqueInput } from './quiz-where-unique.input';
import { Type } from 'class-transformer';
import { QuizCreateWithoutQuiz_versionsInput } from './quiz-create-without-quiz-versions.input';

@InputType()
export class QuizCreateOrConnectWithoutQuiz_versionsInput {

    @Field(() => QuizWhereUniqueInput, {nullable:false})
    @Type(() => QuizWhereUniqueInput)
    where!: Prisma.AtLeast<QuizWhereUniqueInput, 'quiz_id'>;

    @Field(() => QuizCreateWithoutQuiz_versionsInput, {nullable:false})
    @Type(() => QuizCreateWithoutQuiz_versionsInput)
    create!: QuizCreateWithoutQuiz_versionsInput;
}
