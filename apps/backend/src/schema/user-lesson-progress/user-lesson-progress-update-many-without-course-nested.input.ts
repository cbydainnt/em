import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserLessonProgressCreateWithoutCourseInput } from './user-lesson-progress-create-without-course.input';
import { Type } from 'class-transformer';
import { UserLessonProgressCreateOrConnectWithoutCourseInput } from './user-lesson-progress-create-or-connect-without-course.input';
import { UserLessonProgressUpsertWithWhereUniqueWithoutCourseInput } from './user-lesson-progress-upsert-with-where-unique-without-course.input';
import { UserLessonProgressCreateManyCourseInputEnvelope } from './user-lesson-progress-create-many-course-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserLessonProgressWhereUniqueInput } from './user-lesson-progress-where-unique.input';
import { UserLessonProgressUpdateWithWhereUniqueWithoutCourseInput } from './user-lesson-progress-update-with-where-unique-without-course.input';
import { UserLessonProgressUpdateManyWithWhereWithoutCourseInput } from './user-lesson-progress-update-many-with-where-without-course.input';
import { UserLessonProgressScalarWhereInput } from './user-lesson-progress-scalar-where.input';

@InputType()
export class UserLessonProgressUpdateManyWithoutCourseNestedInput {

    @Field(() => [UserLessonProgressCreateWithoutCourseInput], {nullable:true})
    @Type(() => UserLessonProgressCreateWithoutCourseInput)
    create?: Array<UserLessonProgressCreateWithoutCourseInput>;

    @Field(() => [UserLessonProgressCreateOrConnectWithoutCourseInput], {nullable:true})
    @Type(() => UserLessonProgressCreateOrConnectWithoutCourseInput)
    connectOrCreate?: Array<UserLessonProgressCreateOrConnectWithoutCourseInput>;

    @Field(() => [UserLessonProgressUpsertWithWhereUniqueWithoutCourseInput], {nullable:true})
    @Type(() => UserLessonProgressUpsertWithWhereUniqueWithoutCourseInput)
    upsert?: Array<UserLessonProgressUpsertWithWhereUniqueWithoutCourseInput>;

    @Field(() => UserLessonProgressCreateManyCourseInputEnvelope, {nullable:true})
    @Type(() => UserLessonProgressCreateManyCourseInputEnvelope)
    createMany?: UserLessonProgressCreateManyCourseInputEnvelope;

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

    @Field(() => [UserLessonProgressUpdateWithWhereUniqueWithoutCourseInput], {nullable:true})
    @Type(() => UserLessonProgressUpdateWithWhereUniqueWithoutCourseInput)
    update?: Array<UserLessonProgressUpdateWithWhereUniqueWithoutCourseInput>;

    @Field(() => [UserLessonProgressUpdateManyWithWhereWithoutCourseInput], {nullable:true})
    @Type(() => UserLessonProgressUpdateManyWithWhereWithoutCourseInput)
    updateMany?: Array<UserLessonProgressUpdateManyWithWhereWithoutCourseInput>;

    @Field(() => [UserLessonProgressScalarWhereInput], {nullable:true})
    @Type(() => UserLessonProgressScalarWhereInput)
    deleteMany?: Array<UserLessonProgressScalarWhereInput>;
}
