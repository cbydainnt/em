import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizCreateWithoutQuiz_versionsInput } from './quiz-create-without-quiz-versions.input';
import { Type } from 'class-transformer';
import { QuizCreateOrConnectWithoutQuiz_versionsInput } from './quiz-create-or-connect-without-quiz-versions.input';
import { QuizUpsertWithoutQuiz_versionsInput } from './quiz-upsert-without-quiz-versions.input';
import { QuizWhereInput } from './quiz-where.input';
import { Prisma } from '@prisma/client';
import { QuizWhereUniqueInput } from './quiz-where-unique.input';
import { QuizUpdateToOneWithWhereWithoutQuiz_versionsInput } from './quiz-update-to-one-with-where-without-quiz-versions.input';

@InputType()
export class QuizUpdateOneWithoutQuiz_versionsNestedInput {

    @Field(() => QuizCreateWithoutQuiz_versionsInput, {nullable:true})
    @Type(() => QuizCreateWithoutQuiz_versionsInput)
    create?: QuizCreateWithoutQuiz_versionsInput;

    @Field(() => QuizCreateOrConnectWithoutQuiz_versionsInput, {nullable:true})
    @Type(() => QuizCreateOrConnectWithoutQuiz_versionsInput)
    connectOrCreate?: QuizCreateOrConnectWithoutQuiz_versionsInput;

    @Field(() => QuizUpsertWithoutQuiz_versionsInput, {nullable:true})
    @Type(() => QuizUpsertWithoutQuiz_versionsInput)
    upsert?: QuizUpsertWithoutQuiz_versionsInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => QuizWhereInput, {nullable:true})
    @Type(() => QuizWhereInput)
    delete?: QuizWhereInput;

    @Field(() => QuizWhereUniqueInput, {nullable:true})
    @Type(() => QuizWhereUniqueInput)
    connect?: Prisma.AtLeast<QuizWhereUniqueInput, 'quiz_id'>;

    @Field(() => QuizUpdateToOneWithWhereWithoutQuiz_versionsInput, {nullable:true})
    @Type(() => QuizUpdateToOneWithWhereWithoutQuiz_versionsInput)
    update?: QuizUpdateToOneWithWhereWithoutQuiz_versionsInput;
}
