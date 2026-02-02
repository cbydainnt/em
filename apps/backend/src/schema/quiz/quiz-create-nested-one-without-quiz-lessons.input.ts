import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizCreateWithoutQuiz_lessonsInput } from './quiz-create-without-quiz-lessons.input';
import { Type } from 'class-transformer';
import { QuizCreateOrConnectWithoutQuiz_lessonsInput } from './quiz-create-or-connect-without-quiz-lessons.input';
import { Prisma } from '@prisma/client';
import { QuizWhereUniqueInput } from './quiz-where-unique.input';

@InputType()
export class QuizCreateNestedOneWithoutQuiz_lessonsInput {

    @Field(() => QuizCreateWithoutQuiz_lessonsInput, {nullable:true})
    @Type(() => QuizCreateWithoutQuiz_lessonsInput)
    create?: QuizCreateWithoutQuiz_lessonsInput;

    @Field(() => QuizCreateOrConnectWithoutQuiz_lessonsInput, {nullable:true})
    @Type(() => QuizCreateOrConnectWithoutQuiz_lessonsInput)
    connectOrCreate?: QuizCreateOrConnectWithoutQuiz_lessonsInput;

    @Field(() => QuizWhereUniqueInput, {nullable:true})
    @Type(() => QuizWhereUniqueInput)
    connect?: Prisma.AtLeast<QuizWhereUniqueInput, 'quiz_id'>;
}
