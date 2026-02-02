import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserLessonProgressCreateWithoutUserInput } from './user-lesson-progress-create-without-user.input';
import { Type } from 'class-transformer';
import { UserLessonProgressCreateOrConnectWithoutUserInput } from './user-lesson-progress-create-or-connect-without-user.input';
import { UserLessonProgressUpsertWithWhereUniqueWithoutUserInput } from './user-lesson-progress-upsert-with-where-unique-without-user.input';
import { UserLessonProgressCreateManyUserInputEnvelope } from './user-lesson-progress-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserLessonProgressWhereUniqueInput } from './user-lesson-progress-where-unique.input';
import { UserLessonProgressUpdateWithWhereUniqueWithoutUserInput } from './user-lesson-progress-update-with-where-unique-without-user.input';
import { UserLessonProgressUpdateManyWithWhereWithoutUserInput } from './user-lesson-progress-update-many-with-where-without-user.input';
import { UserLessonProgressScalarWhereInput } from './user-lesson-progress-scalar-where.input';

@InputType()
export class UserLessonProgressUncheckedUpdateManyWithoutUserNestedInput {

    @Field(() => [UserLessonProgressCreateWithoutUserInput], {nullable:true})
    @Type(() => UserLessonProgressCreateWithoutUserInput)
    create?: Array<UserLessonProgressCreateWithoutUserInput>;

    @Field(() => [UserLessonProgressCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => UserLessonProgressCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<UserLessonProgressCreateOrConnectWithoutUserInput>;

    @Field(() => [UserLessonProgressUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => UserLessonProgressUpsertWithWhereUniqueWithoutUserInput)
    upsert?: Array<UserLessonProgressUpsertWithWhereUniqueWithoutUserInput>;

    @Field(() => UserLessonProgressCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => UserLessonProgressCreateManyUserInputEnvelope)
    createMany?: UserLessonProgressCreateManyUserInputEnvelope;

    @Field(() => [UserLessonProgressWhereUniqueInput], {nullable:true})
    @Type(() => UserLessonProgressWhereUniqueInput)
    set?: Array<Prisma.AtLeast<UserLessonProgressWhereUniqueInput, 'id' | 'user_id_lesson_id'>>;

    @Field(() => [UserLessonProgressWhereUniqueInput], {nullable:true})
    @Type(() => UserLessonProgressWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<UserLessonProgressWhereUniqueInput, 'id' | 'user_id_lesson_id'>>;

    @Field(() => [UserLessonProgressWhereUniqueInput], {nullable:true})
    @Type(() => UserLessonProgressWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<UserLessonProgressWhereUniqueInput, 'id' | 'user_id_lesson_id'>>;

    @Field(() => [UserLessonProgressWhereUniqueInput], {nullable:true})
    @Type(() => UserLessonProgressWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserLessonProgressWhereUniqueInput, 'id' | 'user_id_lesson_id'>>;

    @Field(() => [UserLessonProgressUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => UserLessonProgressUpdateWithWhereUniqueWithoutUserInput)
    update?: Array<UserLessonProgressUpdateWithWhereUniqueWithoutUserInput>;

    @Field(() => [UserLessonProgressUpdateManyWithWhereWithoutUserInput], {nullable:true})
    @Type(() => UserLessonProgressUpdateManyWithWhereWithoutUserInput)
    updateMany?: Array<UserLessonProgressUpdateManyWithWhereWithoutUserInput>;

    @Field(() => [UserLessonProgressScalarWhereInput], {nullable:true})
    @Type(() => UserLessonProgressScalarWhereInput)
    deleteMany?: Array<UserLessonProgressScalarWhereInput>;
}
