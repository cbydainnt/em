import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCourseCreateWithoutUserInput } from './user-course-create-without-user.input';
import { Type } from 'class-transformer';
import { UserCourseCreateOrConnectWithoutUserInput } from './user-course-create-or-connect-without-user.input';
import { UserCourseCreateManyUserInputEnvelope } from './user-course-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserCourseWhereUniqueInput } from './user-course-where-unique.input';

@InputType()
export class UserCourseUncheckedCreateNestedManyWithoutUserInput {

    @Field(() => [UserCourseCreateWithoutUserInput], {nullable:true})
    @Type(() => UserCourseCreateWithoutUserInput)
    create?: Array<UserCourseCreateWithoutUserInput>;

    @Field(() => [UserCourseCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => UserCourseCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<UserCourseCreateOrConnectWithoutUserInput>;

    @Field(() => UserCourseCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => UserCourseCreateManyUserInputEnvelope)
    createMany?: UserCourseCreateManyUserInputEnvelope;

    @Field(() => [UserCourseWhereUniqueInput], {nullable:true})
    @Type(() => UserCourseWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserCourseWhereUniqueInput, 'id' | 'user_id_course_id'>>;
}
