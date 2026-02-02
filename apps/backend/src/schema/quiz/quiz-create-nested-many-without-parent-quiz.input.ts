import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizCreateWithoutParent_quizInput } from './quiz-create-without-parent-quiz.input';
import { Type } from 'class-transformer';
import { QuizCreateOrConnectWithoutParent_quizInput } from './quiz-create-or-connect-without-parent-quiz.input';
import { QuizCreateManyParent_quizInputEnvelope } from './quiz-create-many-parent-quiz-input-envelope.input';
import { Prisma } from '@prisma/client';
import { QuizWhereUniqueInput } from './quiz-where-unique.input';

@InputType()
export class QuizCreateNestedManyWithoutParent_quizInput {

    @Field(() => [QuizCreateWithoutParent_quizInput], {nullable:true})
    @Type(() => QuizCreateWithoutParent_quizInput)
    create?: Array<QuizCreateWithoutParent_quizInput>;

    @Field(() => [QuizCreateOrConnectWithoutParent_quizInput], {nullable:true})
    @Type(() => QuizCreateOrConnectWithoutParent_quizInput)
    connectOrCreate?: Array<QuizCreateOrConnectWithoutParent_quizInput>;

    @Field(() => QuizCreateManyParent_quizInputEnvelope, {nullable:true})
    @Type(() => QuizCreateManyParent_quizInputEnvelope)
    createMany?: QuizCreateManyParent_quizInputEnvelope;

    @Field(() => [QuizWhereUniqueInput], {nullable:true})
    @Type(() => QuizWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<QuizWhereUniqueInput, 'quiz_id'>>;
}
