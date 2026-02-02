import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCourseCreateWithoutUserInput } from './user-course-create-without-user.input';
import { Type } from 'class-transformer';
import { UserCourseCreateOrConnectWithoutUserInput } from './user-course-create-or-connect-without-user.input';
import { UserCourseUpsertWithWhereUniqueWithoutUserInput } from './user-course-upsert-with-where-unique-without-user.input';
import { UserCourseCreateManyUserInputEnvelope } from './user-course-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserCourseWhereUniqueInput } from './user-course-where-unique.input';
import { UserCourseUpdateWithWhereUniqueWithoutUserInput } from './user-course-update-with-where-unique-without-user.input';
import { UserCourseUpdateManyWithWhereWithoutUserInput } from './user-course-update-many-with-where-without-user.input';
import { UserCourseScalarWhereInput } from './user-course-scalar-where.input';

@InputType()
export class UserCourseUncheckedUpdateManyWithoutUserNestedInput {

    @Field(() => [UserCourseCreateWithoutUserInput], {nullable:true})
    @Type(() => UserCourseCreateWithoutUserInput)
    create?: Array<UserCourseCreateWithoutUserInput>;

    @Field(() => [UserCourseCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => UserCourseCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<UserCourseCreateOrConnectWithoutUserInput>;

    @Field(() => [UserCourseUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => UserCourseUpsertWithWhereUniqueWithoutUserInput)
    upsert?: Array<UserCourseUpsertWithWhereUniqueWithoutUserInput>;

    @Field(() => UserCourseCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => UserCourseCreateManyUserInputEnvelope)
    createMany?: UserCourseCreateManyUserInputEnvelope;

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

    @Field(() => [UserCourseUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => UserCourseUpdateWithWhereUniqueWithoutUserInput)
    update?: Array<UserCourseUpdateWithWhereUniqueWithoutUserInput>;

    @Field(() => [UserCourseUpdateManyWithWhereWithoutUserInput], {nullable:true})
    @Type(() => UserCourseUpdateManyWithWhereWithoutUserInput)
    updateMany?: Array<UserCourseUpdateManyWithWhereWithoutUserInput>;

    @Field(() => [UserCourseScalarWhereInput], {nullable:true})
    @Type(() => UserCourseScalarWhereInput)
    deleteMany?: Array<UserCourseScalarWhereInput>;
}
