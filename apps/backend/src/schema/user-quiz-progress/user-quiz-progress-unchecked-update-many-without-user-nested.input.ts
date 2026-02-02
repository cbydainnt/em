import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserQuizProgressCreateWithoutUserInput } from './user-quiz-progress-create-without-user.input';
import { Type } from 'class-transformer';
import { UserQuizProgressCreateOrConnectWithoutUserInput } from './user-quiz-progress-create-or-connect-without-user.input';
import { UserQuizProgressUpsertWithWhereUniqueWithoutUserInput } from './user-quiz-progress-upsert-with-where-unique-without-user.input';
import { UserQuizProgressCreateManyUserInputEnvelope } from './user-quiz-progress-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserQuizProgressWhereUniqueInput } from './user-quiz-progress-where-unique.input';
import { UserQuizProgressUpdateWithWhereUniqueWithoutUserInput } from './user-quiz-progress-update-with-where-unique-without-user.input';
import { UserQuizProgressUpdateManyWithWhereWithoutUserInput } from './user-quiz-progress-update-many-with-where-without-user.input';
import { UserQuizProgressScalarWhereInput } from './user-quiz-progress-scalar-where.input';

@InputType()
export class UserQuizProgressUncheckedUpdateManyWithoutUserNestedInput {

    @Field(() => [UserQuizProgressCreateWithoutUserInput], {nullable:true})
    @Type(() => UserQuizProgressCreateWithoutUserInput)
    create?: Array<UserQuizProgressCreateWithoutUserInput>;

    @Field(() => [UserQuizProgressCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => UserQuizProgressCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<UserQuizProgressCreateOrConnectWithoutUserInput>;

    @Field(() => [UserQuizProgressUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => UserQuizProgressUpsertWithWhereUniqueWithoutUserInput)
    upsert?: Array<UserQuizProgressUpsertWithWhereUniqueWithoutUserInput>;

    @Field(() => UserQuizProgressCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => UserQuizProgressCreateManyUserInputEnvelope)
    createMany?: UserQuizProgressCreateManyUserInputEnvelope;

    @Field(() => [UserQuizProgressWhereUniqueInput], {nullable:true})
    @Type(() => UserQuizProgressWhereUniqueInput)
    set?: Array<Prisma.AtLeast<UserQuizProgressWhereUniqueInput, 'progress_id' | 'user_id_quiz_id_lesson_id_attempts'>>;

    @Field(() => [UserQuizProgressWhereUniqueInput], {nullable:true})
    @Type(() => UserQuizProgressWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<UserQuizProgressWhereUniqueInput, 'progress_id' | 'user_id_quiz_id_lesson_id_attempts'>>;

    @Field(() => [UserQuizProgressWhereUniqueInput], {nullable:true})
    @Type(() => UserQuizProgressWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<UserQuizProgressWhereUniqueInput, 'progress_id' | 'user_id_quiz_id_lesson_id_attempts'>>;

    @Field(() => [UserQuizProgressWhereUniqueInput], {nullable:true})
    @Type(() => UserQuizProgressWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserQuizProgressWhereUniqueInput, 'progress_id' | 'user_id_quiz_id_lesson_id_attempts'>>;

    @Field(() => [UserQuizProgressUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => UserQuizProgressUpdateWithWhereUniqueWithoutUserInput)
    update?: Array<UserQuizProgressUpdateWithWhereUniqueWithoutUserInput>;

    @Field(() => [UserQuizProgressUpdateManyWithWhereWithoutUserInput], {nullable:true})
    @Type(() => UserQuizProgressUpdateManyWithWhereWithoutUserInput)
    updateMany?: Array<UserQuizProgressUpdateManyWithWhereWithoutUserInput>;

    @Field(() => [UserQuizProgressScalarWhereInput], {nullable:true})
    @Type(() => UserQuizProgressScalarWhereInput)
    deleteMany?: Array<UserQuizProgressScalarWhereInput>;
}
