import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserQuizAnswerCreateWithoutQuestionInput } from './user-quiz-answer-create-without-question.input';
import { Type } from 'class-transformer';
import { UserQuizAnswerCreateOrConnectWithoutQuestionInput } from './user-quiz-answer-create-or-connect-without-question.input';
import { UserQuizAnswerUpsertWithWhereUniqueWithoutQuestionInput } from './user-quiz-answer-upsert-with-where-unique-without-question.input';
import { UserQuizAnswerCreateManyQuestionInputEnvelope } from './user-quiz-answer-create-many-question-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserQuizAnswerWhereUniqueInput } from './user-quiz-answer-where-unique.input';
import { UserQuizAnswerUpdateWithWhereUniqueWithoutQuestionInput } from './user-quiz-answer-update-with-where-unique-without-question.input';
import { UserQuizAnswerUpdateManyWithWhereWithoutQuestionInput } from './user-quiz-answer-update-many-with-where-without-question.input';
import { UserQuizAnswerScalarWhereInput } from './user-quiz-answer-scalar-where.input';

@InputType()
export class UserQuizAnswerUncheckedUpdateManyWithoutQuestionNestedInput {

    @Field(() => [UserQuizAnswerCreateWithoutQuestionInput], {nullable:true})
    @Type(() => UserQuizAnswerCreateWithoutQuestionInput)
    create?: Array<UserQuizAnswerCreateWithoutQuestionInput>;

    @Field(() => [UserQuizAnswerCreateOrConnectWithoutQuestionInput], {nullable:true})
    @Type(() => UserQuizAnswerCreateOrConnectWithoutQuestionInput)
    connectOrCreate?: Array<UserQuizAnswerCreateOrConnectWithoutQuestionInput>;

    @Field(() => [UserQuizAnswerUpsertWithWhereUniqueWithoutQuestionInput], {nullable:true})
    @Type(() => UserQuizAnswerUpsertWithWhereUniqueWithoutQuestionInput)
    upsert?: Array<UserQuizAnswerUpsertWithWhereUniqueWithoutQuestionInput>;

    @Field(() => UserQuizAnswerCreateManyQuestionInputEnvelope, {nullable:true})
    @Type(() => UserQuizAnswerCreateManyQuestionInputEnvelope)
    createMany?: UserQuizAnswerCreateManyQuestionInputEnvelope;

    @Field(() => [UserQuizAnswerWhereUniqueInput], {nullable:true})
    @Type(() => UserQuizAnswerWhereUniqueInput)
    set?: Array<Prisma.AtLeast<UserQuizAnswerWhereUniqueInput, 'id' | 'progress_id_question_id'>>;

    @Field(() => [UserQuizAnswerWhereUniqueInput], {nullable:true})
    @Type(() => UserQuizAnswerWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<UserQuizAnswerWhereUniqueInput, 'id' | 'progress_id_question_id'>>;

    @Field(() => [UserQuizAnswerWhereUniqueInput], {nullable:true})
    @Type(() => UserQuizAnswerWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<UserQuizAnswerWhereUniqueInput, 'id' | 'progress_id_question_id'>>;

    @Field(() => [UserQuizAnswerWhereUniqueInput], {nullable:true})
    @Type(() => UserQuizAnswerWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserQuizAnswerWhereUniqueInput, 'id' | 'progress_id_question_id'>>;

    @Field(() => [UserQuizAnswerUpdateWithWhereUniqueWithoutQuestionInput], {nullable:true})
    @Type(() => UserQuizAnswerUpdateWithWhereUniqueWithoutQuestionInput)
    update?: Array<UserQuizAnswerUpdateWithWhereUniqueWithoutQuestionInput>;

    @Field(() => [UserQuizAnswerUpdateManyWithWhereWithoutQuestionInput], {nullable:true})
    @Type(() => UserQuizAnswerUpdateManyWithWhereWithoutQuestionInput)
    updateMany?: Array<UserQuizAnswerUpdateManyWithWhereWithoutQuestionInput>;

    @Field(() => [UserQuizAnswerScalarWhereInput], {nullable:true})
    @Type(() => UserQuizAnswerScalarWhereInput)
    deleteMany?: Array<UserQuizAnswerScalarWhereInput>;
}
