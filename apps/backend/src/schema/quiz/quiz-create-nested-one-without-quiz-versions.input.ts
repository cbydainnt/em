import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizCreateWithoutQuiz_versionsInput } from './quiz-create-without-quiz-versions.input';
import { Type } from 'class-transformer';
import { QuizCreateOrConnectWithoutQuiz_versionsInput } from './quiz-create-or-connect-without-quiz-versions.input';
import { Prisma } from '@prisma/client';
import { QuizWhereUniqueInput } from './quiz-where-unique.input';

@InputType()
export class QuizCreateNestedOneWithoutQuiz_versionsInput {

    @Field(() => QuizCreateWithoutQuiz_versionsInput, {nullable:true})
    @Type(() => QuizCreateWithoutQuiz_versionsInput)
    create?: QuizCreateWithoutQuiz_versionsInput;

    @Field(() => QuizCreateOrConnectWithoutQuiz_versionsInput, {nullable:true})
    @Type(() => QuizCreateOrConnectWithoutQuiz_versionsInput)
    connectOrCreate?: QuizCreateOrConnectWithoutQuiz_versionsInput;

    @Field(() => QuizWhereUniqueInput, {nullable:true})
    @Type(() => QuizWhereUniqueInput)
    connect?: Prisma.AtLeast<QuizWhereUniqueInput, 'quiz_id'>;
}
