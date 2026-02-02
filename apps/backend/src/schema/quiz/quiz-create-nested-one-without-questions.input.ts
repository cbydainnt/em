import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizCreateWithoutQuestionsInput } from './quiz-create-without-questions.input';
import { Type } from 'class-transformer';
import { QuizCreateOrConnectWithoutQuestionsInput } from './quiz-create-or-connect-without-questions.input';
import { Prisma } from '@prisma/client';
import { QuizWhereUniqueInput } from './quiz-where-unique.input';

@InputType()
export class QuizCreateNestedOneWithoutQuestionsInput {

    @Field(() => QuizCreateWithoutQuestionsInput, {nullable:true})
    @Type(() => QuizCreateWithoutQuestionsInput)
    create?: QuizCreateWithoutQuestionsInput;

    @Field(() => QuizCreateOrConnectWithoutQuestionsInput, {nullable:true})
    @Type(() => QuizCreateOrConnectWithoutQuestionsInput)
    connectOrCreate?: QuizCreateOrConnectWithoutQuestionsInput;

    @Field(() => QuizWhereUniqueInput, {nullable:true})
    @Type(() => QuizWhereUniqueInput)
    connect?: Prisma.AtLeast<QuizWhereUniqueInput, 'quiz_id'>;
}
