import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuestionCreateWithoutQuizInput } from './question-create-without-quiz.input';
import { Type } from 'class-transformer';
import { QuestionCreateOrConnectWithoutQuizInput } from './question-create-or-connect-without-quiz.input';
import { QuestionCreateManyQuizInputEnvelope } from './question-create-many-quiz-input-envelope.input';
import { Prisma } from '@prisma/client';
import { QuestionWhereUniqueInput } from './question-where-unique.input';

@InputType()
export class QuestionUncheckedCreateNestedManyWithoutQuizInput {

    @Field(() => [QuestionCreateWithoutQuizInput], {nullable:true})
    @Type(() => QuestionCreateWithoutQuizInput)
    create?: Array<QuestionCreateWithoutQuizInput>;

    @Field(() => [QuestionCreateOrConnectWithoutQuizInput], {nullable:true})
    @Type(() => QuestionCreateOrConnectWithoutQuizInput)
    connectOrCreate?: Array<QuestionCreateOrConnectWithoutQuizInput>;

    @Field(() => QuestionCreateManyQuizInputEnvelope, {nullable:true})
    @Type(() => QuestionCreateManyQuizInputEnvelope)
    createMany?: QuestionCreateManyQuizInputEnvelope;

    @Field(() => [QuestionWhereUniqueInput], {nullable:true})
    @Type(() => QuestionWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<QuestionWhereUniqueInput, 'question_id'>>;
}
