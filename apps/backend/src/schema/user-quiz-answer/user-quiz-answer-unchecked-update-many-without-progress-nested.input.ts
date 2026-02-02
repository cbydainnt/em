import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserQuizAnswerCreateWithoutProgressInput } from './user-quiz-answer-create-without-progress.input';
import { Type } from 'class-transformer';
import { UserQuizAnswerCreateOrConnectWithoutProgressInput } from './user-quiz-answer-create-or-connect-without-progress.input';
import { UserQuizAnswerUpsertWithWhereUniqueWithoutProgressInput } from './user-quiz-answer-upsert-with-where-unique-without-progress.input';
import { UserQuizAnswerCreateManyProgressInputEnvelope } from './user-quiz-answer-create-many-progress-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserQuizAnswerWhereUniqueInput } from './user-quiz-answer-where-unique.input';
import { UserQuizAnswerUpdateWithWhereUniqueWithoutProgressInput } from './user-quiz-answer-update-with-where-unique-without-progress.input';
import { UserQuizAnswerUpdateManyWithWhereWithoutProgressInput } from './user-quiz-answer-update-many-with-where-without-progress.input';
import { UserQuizAnswerScalarWhereInput } from './user-quiz-answer-scalar-where.input';

@InputType()
export class UserQuizAnswerUncheckedUpdateManyWithoutProgressNestedInput {

    @Field(() => [UserQuizAnswerCreateWithoutProgressInput], {nullable:true})
    @Type(() => UserQuizAnswerCreateWithoutProgressInput)
    create?: Array<UserQuizAnswerCreateWithoutProgressInput>;

    @Field(() => [UserQuizAnswerCreateOrConnectWithoutProgressInput], {nullable:true})
    @Type(() => UserQuizAnswerCreateOrConnectWithoutProgressInput)
    connectOrCreate?: Array<UserQuizAnswerCreateOrConnectWithoutProgressInput>;

    @Field(() => [UserQuizAnswerUpsertWithWhereUniqueWithoutProgressInput], {nullable:true})
    @Type(() => UserQuizAnswerUpsertWithWhereUniqueWithoutProgressInput)
    upsert?: Array<UserQuizAnswerUpsertWithWhereUniqueWithoutProgressInput>;

    @Field(() => UserQuizAnswerCreateManyProgressInputEnvelope, {nullable:true})
    @Type(() => UserQuizAnswerCreateManyProgressInputEnvelope)
    createMany?: UserQuizAnswerCreateManyProgressInputEnvelope;

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

    @Field(() => [UserQuizAnswerUpdateWithWhereUniqueWithoutProgressInput], {nullable:true})
    @Type(() => UserQuizAnswerUpdateWithWhereUniqueWithoutProgressInput)
    update?: Array<UserQuizAnswerUpdateWithWhereUniqueWithoutProgressInput>;

    @Field(() => [UserQuizAnswerUpdateManyWithWhereWithoutProgressInput], {nullable:true})
    @Type(() => UserQuizAnswerUpdateManyWithWhereWithoutProgressInput)
    updateMany?: Array<UserQuizAnswerUpdateManyWithWhereWithoutProgressInput>;

    @Field(() => [UserQuizAnswerScalarWhereInput], {nullable:true})
    @Type(() => UserQuizAnswerScalarWhereInput)
    deleteMany?: Array<UserQuizAnswerScalarWhereInput>;
}
