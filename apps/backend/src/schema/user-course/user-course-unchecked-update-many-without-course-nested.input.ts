import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCourseCreateWithoutCourseInput } from './user-course-create-without-course.input';
import { Type } from 'class-transformer';
import { UserCourseCreateOrConnectWithoutCourseInput } from './user-course-create-or-connect-without-course.input';
import { UserCourseUpsertWithWhereUniqueWithoutCourseInput } from './user-course-upsert-with-where-unique-without-course.input';
import { UserCourseCreateManyCourseInputEnvelope } from './user-course-create-many-course-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserCourseWhereUniqueInput } from './user-course-where-unique.input';
import { UserCourseUpdateWithWhereUniqueWithoutCourseInput } from './user-course-update-with-where-unique-without-course.input';
import { UserCourseUpdateManyWithWhereWithoutCourseInput } from './user-course-update-many-with-where-without-course.input';
import { UserCourseScalarWhereInput } from './user-course-scalar-where.input';

@InputType()
export class UserCourseUncheckedUpdateManyWithoutCourseNestedInput {

    @Field(() => [UserCourseCreateWithoutCourseInput], {nullable:true})
    @Type(() => UserCourseCreateWithoutCourseInput)
    create?: Array<UserCourseCreateWithoutCourseInput>;

    @Field(() => [UserCourseCreateOrConnectWithoutCourseInput], {nullable:true})
    @Type(() => UserCourseCreateOrConnectWithoutCourseInput)
    connectOrCreate?: Array<UserCourseCreateOrConnectWithoutCourseInput>;

    @Field(() => [UserCourseUpsertWithWhereUniqueWithoutCourseInput], {nullable:true})
    @Type(() => UserCourseUpsertWithWhereUniqueWithoutCourseInput)
    upsert?: Array<UserCourseUpsertWithWhereUniqueWithoutCourseInput>;

    @Field(() => UserCourseCreateManyCourseInputEnvelope, {nullable:true})
    @Type(() => UserCourseCreateManyCourseInputEnvelope)
    createMany?: UserCourseCreateManyCourseInputEnvelope;

    @Field(() => [UserCourseWhereUniqueInput], {nullable:true})
    @Type(() => UserCourseWhereUniqueInput)
    set?: Array<Prisma.AtLeast<UserCourseWhereUniqueInput, 'id' | 'user_id_course_id'>>;

    @Field(() => [UserCourseWhereUniqueInput], {nullable:true})
    @Type(() => UserCourseWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<UserCourseWhereUniqueInput, 'id' | 'user_id_course_id'>>;

    @Field(() => [UserCourseWhereUniqueInput], {nullable:true})
    @Type(() => UserCourseWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<UserCourseWhereUniqueInput, 'id' | 'user_id_course_id'>>;

    @Field(() => [UserCourseWhereUniqueInput], {nullable:true})
    @Type(() => UserCourseWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserCourseWhereUniqueInput, 'id' | 'user_id_course_id'>>;

    @Field(() => [UserCourseUpdateWithWhereUniqueWithoutCourseInput], {nullable:true})
    @Type(() => UserCourseUpdateWithWhereUniqueWithoutCourseInput)
    update?: Array<UserCourseUpdateWithWhereUniqueWithoutCourseInput>;

    @Field(() => [UserCourseUpdateManyWithWhereWithoutCourseInput], {nullable:true})
    @Type(() => UserCourseUpdateManyWithWhereWithoutCourseInput)
    updateMany?: Array<UserCourseUpdateManyWithWhereWithoutCourseInput>;

    @Field(() => [UserCourseScalarWhereInput], {nullable:true})
    @Type(() => UserCourseScalarWhereInput)
    deleteMany?: Array<UserCourseScalarWhereInput>;
}
