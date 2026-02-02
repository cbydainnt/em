import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserQuizAnswerCreateWithoutQuestionInput } from './user-quiz-answer-create-without-question.input';
import { Type } from 'class-transformer';
import { UserQuizAnswerCreateOrConnectWithoutQuestionInput } from './user-quiz-answer-create-or-connect-without-question.input';
import { UserQuizAnswerCreateManyQuestionInputEnvelope } from './user-quiz-answer-create-many-question-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserQuizAnswerWhereUniqueInput } from './user-quiz-answer-where-unique.input';

@InputType()
export class UserQuizAnswerUncheckedCreateNestedManyWithoutQuestionInput {

    @Field(() => [UserQuizAnswerCreateWithoutQuestionInput], {nullable:true})
    @Type(() => UserQuizAnswerCreateWithoutQuestionInput)
    create?: Array<UserQuizAnswerCreateWithoutQuestionInput>;

    @Field(() => [UserQuizAnswerCreateOrConnectWithoutQuestionInput], {nullable:true})
    @Type(() => UserQuizAnswerCreateOrConnectWithoutQuestionInput)
    connectOrCreate?: Array<UserQuizAnswerCreateOrConnectWithoutQuestionInput>;

    @Field(() => UserQuizAnswerCreateManyQuestionInputEnvelope, {nullable:true})
    @Type(() => UserQuizAnswerCreateManyQuestionInputEnvelope)
    createMany?: UserQuizAnswerCreateManyQuestionInputEnvelope;

    @Field(() => [UserQuizAnswerWhereUniqueInput], {nullable:true})
    @Type(() => UserQuizAnswerWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserQuizAnswerWhereUniqueInput, 'id' | 'progress_id_question_id'>>;
}
