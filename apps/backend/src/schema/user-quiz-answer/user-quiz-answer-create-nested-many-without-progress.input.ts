import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserQuizAnswerCreateWithoutProgressInput } from './user-quiz-answer-create-without-progress.input';
import { Type } from 'class-transformer';
import { UserQuizAnswerCreateOrConnectWithoutProgressInput } from './user-quiz-answer-create-or-connect-without-progress.input';
import { UserQuizAnswerCreateManyProgressInputEnvelope } from './user-quiz-answer-create-many-progress-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserQuizAnswerWhereUniqueInput } from './user-quiz-answer-where-unique.input';

@InputType()
export class UserQuizAnswerCreateNestedManyWithoutProgressInput {

    @Field(() => [UserQuizAnswerCreateWithoutProgressInput], {nullable:true})
    @Type(() => UserQuizAnswerCreateWithoutProgressInput)
    create?: Array<UserQuizAnswerCreateWithoutProgressInput>;

    @Field(() => [UserQuizAnswerCreateOrConnectWithoutProgressInput], {nullable:true})
    @Type(() => UserQuizAnswerCreateOrConnectWithoutProgressInput)
    connectOrCreate?: Array<UserQuizAnswerCreateOrConnectWithoutProgressInput>;

    @Field(() => UserQuizAnswerCreateManyProgressInputEnvelope, {nullable:true})
    @Type(() => UserQuizAnswerCreateManyProgressInputEnvelope)
    createMany?: UserQuizAnswerCreateManyProgressInputEnvelope;

    @Field(() => [UserQuizAnswerWhereUniqueInput], {nullable:true})
    @Type(() => UserQuizAnswerWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserQuizAnswerWhereUniqueInput, 'id' | 'progress_id_question_id'>>;
}
