import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserLessonProgressCreateWithoutLessonInput } from './user-lesson-progress-create-without-lesson.input';
import { Type } from 'class-transformer';
import { UserLessonProgressCreateOrConnectWithoutLessonInput } from './user-lesson-progress-create-or-connect-without-lesson.input';
import { UserLessonProgressUpsertWithWhereUniqueWithoutLessonInput } from './user-lesson-progress-upsert-with-where-unique-without-lesson.input';
import { UserLessonProgressCreateManyLessonInputEnvelope } from './user-lesson-progress-create-many-lesson-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserLessonProgressWhereUniqueInput } from './user-lesson-progress-where-unique.input';
import { UserLessonProgressUpdateWithWhereUniqueWithoutLessonInput } from './user-lesson-progress-update-with-where-unique-without-lesson.input';
import { UserLessonProgressUpdateManyWithWhereWithoutLessonInput } from './user-lesson-progress-update-many-with-where-without-lesson.input';
import { UserLessonProgressScalarWhereInput } from './user-lesson-progress-scalar-where.input';

@InputType()
export class UserLessonProgressUpdateManyWithoutLessonNestedInput {

    @Field(() => [UserLessonProgressCreateWithoutLessonInput], {nullable:true})
    @Type(() => UserLessonProgressCreateWithoutLessonInput)
    create?: Array<UserLessonProgressCreateWithoutLessonInput>;

    @Field(() => [UserLessonProgressCreateOrConnectWithoutLessonInput], {nullable:true})
    @Type(() => UserLessonProgressCreateOrConnectWithoutLessonInput)
    connectOrCreate?: Array<UserLessonProgressCreateOrConnectWithoutLessonInput>;

    @Field(() => [UserLessonProgressUpsertWithWhereUniqueWithoutLessonInput], {nullable:true})
    @Type(() => UserLessonProgressUpsertWithWhereUniqueWithoutLessonInput)
    upsert?: Array<UserLessonProgressUpsertWithWhereUniqueWithoutLessonInput>;

    @Field(() => UserLessonProgressCreateManyLessonInputEnvelope, {nullable:true})
    @Type(() => UserLessonProgressCreateManyLessonInputEnvelope)
    createMany?: UserLessonProgressCreateManyLessonInputEnvelope;

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

    @Field(() => [UserLessonProgressUpdateWithWhereUniqueWithoutLessonInput], {nullable:true})
    @Type(() => UserLessonProgressUpdateWithWhereUniqueWithoutLessonInput)
    update?: Array<UserLessonProgressUpdateWithWhereUniqueWithoutLessonInput>;

    @Field(() => [UserLessonProgressUpdateManyWithWhereWithoutLessonInput], {nullable:true})
    @Type(() => UserLessonProgressUpdateManyWithWhereWithoutLessonInput)
    updateMany?: Array<UserLessonProgressUpdateManyWithWhereWithoutLessonInput>;

    @Field(() => [UserLessonProgressScalarWhereInput], {nullable:true})
    @Type(() => UserLessonProgressScalarWhereInput)
    deleteMany?: Array<UserLessonProgressScalarWhereInput>;
}
