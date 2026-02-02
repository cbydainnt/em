import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCourseCreateWithoutCourseInput } from './user-course-create-without-course.input';
import { Type } from 'class-transformer';
import { UserCourseCreateOrConnectWithoutCourseInput } from './user-course-create-or-connect-without-course.input';
import { UserCourseCreateManyCourseInputEnvelope } from './user-course-create-many-course-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserCourseWhereUniqueInput } from './user-course-where-unique.input';

@InputType()
export class UserCourseUncheckedCreateNestedManyWithoutCourseInput {

    @Field(() => [UserCourseCreateWithoutCourseInput], {nullable:true})
    @Type(() => UserCourseCreateWithoutCourseInput)
    create?: Array<UserCourseCreateWithoutCourseInput>;

    @Field(() => [UserCourseCreateOrConnectWithoutCourseInput], {nullable:true})
    @Type(() => UserCourseCreateOrConnectWithoutCourseInput)
    connectOrCreate?: Array<UserCourseCreateOrConnectWithoutCourseInput>;

    @Field(() => UserCourseCreateManyCourseInputEnvelope, {nullable:true})
    @Type(() => UserCourseCreateManyCourseInputEnvelope)
    createMany?: UserCourseCreateManyCourseInputEnvelope;

    @Field(() => [UserCourseWhereUniqueInput], {nullable:true})
    @Type(() => UserCourseWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserCourseWhereUniqueInput, 'id' | 'user_id_course_id'>>;
}
