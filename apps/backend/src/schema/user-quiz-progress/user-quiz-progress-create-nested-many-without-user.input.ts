import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserQuizProgressCreateWithoutUserInput } from './user-quiz-progress-create-without-user.input';
import { Type } from 'class-transformer';
import { UserQuizProgressCreateOrConnectWithoutUserInput } from './user-quiz-progress-create-or-connect-without-user.input';
import { UserQuizProgressCreateManyUserInputEnvelope } from './user-quiz-progress-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserQuizProgressWhereUniqueInput } from './user-quiz-progress-where-unique.input';

@InputType()
export class UserQuizProgressCreateNestedManyWithoutUserInput {

    @Field(() => [UserQuizProgressCreateWithoutUserInput], {nullable:true})
    @Type(() => UserQuizProgressCreateWithoutUserInput)
    create?: Array<UserQuizProgressCreateWithoutUserInput>;

    @Field(() => [UserQuizProgressCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => UserQuizProgressCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<UserQuizProgressCreateOrConnectWithoutUserInput>;

    @Field(() => UserQuizProgressCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => UserQuizProgressCreateManyUserInputEnvelope)
    createMany?: UserQuizProgressCreateManyUserInputEnvelope;

    @Field(() => [UserQuizProgressWhereUniqueInput], {nullable:true})
    @Type(() => UserQuizProgressWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserQuizProgressWhereUniqueInput, 'progress_id' | 'user_id_quiz_id_lesson_id_attempts'>>;
}
