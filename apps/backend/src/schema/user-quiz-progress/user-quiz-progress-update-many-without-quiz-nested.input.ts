import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserQuizProgressCreateWithoutQuizInput } from './user-quiz-progress-create-without-quiz.input';
import { Type } from 'class-transformer';
import { UserQuizProgressCreateOrConnectWithoutQuizInput } from './user-quiz-progress-create-or-connect-without-quiz.input';
import { UserQuizProgressUpsertWithWhereUniqueWithoutQuizInput } from './user-quiz-progress-upsert-with-where-unique-without-quiz.input';
import { UserQuizProgressCreateManyQuizInputEnvelope } from './user-quiz-progress-create-many-quiz-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserQuizProgressWhereUniqueInput } from './user-quiz-progress-where-unique.input';
import { UserQuizProgressUpdateWithWhereUniqueWithoutQuizInput } from './user-quiz-progress-update-with-where-unique-without-quiz.input';
import { UserQuizProgressUpdateManyWithWhereWithoutQuizInput } from './user-quiz-progress-update-many-with-where-without-quiz.input';
import { UserQuizProgressScalarWhereInput } from './user-quiz-progress-scalar-where.input';

@InputType()
export class UserQuizProgressUpdateManyWithoutQuizNestedInput {

    @Field(() => [UserQuizProgressCreateWithoutQuizInput], {nullable:true})
    @Type(() => UserQuizProgressCreateWithoutQuizInput)
    create?: Array<UserQuizProgressCreateWithoutQuizInput>;

    @Field(() => [UserQuizProgressCreateOrConnectWithoutQuizInput], {nullable:true})
    @Type(() => UserQuizProgressCreateOrConnectWithoutQuizInput)
    connectOrCreate?: Array<UserQuizProgressCreateOrConnectWithoutQuizInput>;

    @Field(() => [UserQuizProgressUpsertWithWhereUniqueWithoutQuizInput], {nullable:true})
    @Type(() => UserQuizProgressUpsertWithWhereUniqueWithoutQuizInput)
    upsert?: Array<UserQuizProgressUpsertWithWhereUniqueWithoutQuizInput>;

    @Field(() => UserQuizProgressCreateManyQuizInputEnvelope, {nullable:true})
    @Type(() => UserQuizProgressCreateManyQuizInputEnvelope)
    createMany?: UserQuizProgressCreateManyQuizInputEnvelope;

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

    @Field(() => [UserQuizProgressUpdateWithWhereUniqueWithoutQuizInput], {nullable:true})
    @Type(() => UserQuizProgressUpdateWithWhereUniqueWithoutQuizInput)
    update?: Array<UserQuizProgressUpdateWithWhereUniqueWithoutQuizInput>;

    @Field(() => [UserQuizProgressUpdateManyWithWhereWithoutQuizInput], {nullable:true})
    @Type(() => UserQuizProgressUpdateManyWithWhereWithoutQuizInput)
    updateMany?: Array<UserQuizProgressUpdateManyWithWhereWithoutQuizInput>;

    @Field(() => [UserQuizProgressScalarWhereInput], {nullable:true})
    @Type(() => UserQuizProgressScalarWhereInput)
    deleteMany?: Array<UserQuizProgressScalarWhereInput>;
}
