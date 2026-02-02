import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserLessonProgressCreateWithoutCourseInput } from './user-lesson-progress-create-without-course.input';
import { Type } from 'class-transformer';
import { UserLessonProgressCreateOrConnectWithoutCourseInput } from './user-lesson-progress-create-or-connect-without-course.input';
import { UserLessonProgressCreateManyCourseInputEnvelope } from './user-lesson-progress-create-many-course-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserLessonProgressWhereUniqueInput } from './user-lesson-progress-where-unique.input';

@InputType()
export class UserLessonProgressCreateNestedManyWithoutCourseInput {

    @Field(() => [UserLessonProgressCreateWithoutCourseInput], {nullable:true})
    @Type(() => UserLessonProgressCreateWithoutCourseInput)
    create?: Array<UserLessonProgressCreateWithoutCourseInput>;

    @Field(() => [UserLessonProgressCreateOrConnectWithoutCourseInput], {nullable:true})
    @Type(() => UserLessonProgressCreateOrConnectWithoutCourseInput)
    connectOrCreate?: Array<UserLessonProgressCreateOrConnectWithoutCourseInput>;

    @Field(() => UserLessonProgressCreateManyCourseInputEnvelope, {nullable:true})
    @Type(() => UserLessonProgressCreateManyCourseInputEnvelope)
    createMany?: UserLessonProgressCreateManyCourseInputEnvelope;

    @Field(() => [UserLessonProgressWhereUniqueInput], {nullable:true})
    @Type(() => UserLessonProgressWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserLessonProgressWhereUniqueInput, 'id' | 'user_id_lesson_id'>>;
}
