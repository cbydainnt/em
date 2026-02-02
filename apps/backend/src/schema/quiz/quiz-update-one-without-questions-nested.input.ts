import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizCreateWithoutQuestionsInput } from './quiz-create-without-questions.input';
import { Type } from 'class-transformer';
import { QuizCreateOrConnectWithoutQuestionsInput } from './quiz-create-or-connect-without-questions.input';
import { QuizUpsertWithoutQuestionsInput } from './quiz-upsert-without-questions.input';
import { QuizWhereInput } from './quiz-where.input';
import { Prisma } from '@prisma/client';
import { QuizWhereUniqueInput } from './quiz-where-unique.input';
import { QuizUpdateToOneWithWhereWithoutQuestionsInput } from './quiz-update-to-one-with-where-without-questions.input';

@InputType()
export class QuizUpdateOneWithoutQuestionsNestedInput {

    @Field(() => QuizCreateWithoutQuestionsInput, {nullable:true})
    @Type(() => QuizCreateWithoutQuestionsInput)
    create?: QuizCreateWithoutQuestionsInput;

    @Field(() => QuizCreateOrConnectWithoutQuestionsInput, {nullable:true})
    @Type(() => QuizCreateOrConnectWithoutQuestionsInput)
    connectOrCreate?: QuizCreateOrConnectWithoutQuestionsInput;

    @Field(() => QuizUpsertWithoutQuestionsInput, {nullable:true})
    @Type(() => QuizUpsertWithoutQuestionsInput)
    upsert?: QuizUpsertWithoutQuestionsInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => QuizWhereInput, {nullable:true})
    @Type(() => QuizWhereInput)
    delete?: QuizWhereInput;

    @Field(() => QuizWhereUniqueInput, {nullable:true})
    @Type(() => QuizWhereUniqueInput)
    connect?: Prisma.AtLeast<QuizWhereUniqueInput, 'quiz_id'>;

    @Field(() => QuizUpdateToOneWithWhereWithoutQuestionsInput, {nullable:true})
    @Type(() => QuizUpdateToOneWithWhereWithoutQuestionsInput)
    update?: QuizUpdateToOneWithWhereWithoutQuestionsInput;
}
