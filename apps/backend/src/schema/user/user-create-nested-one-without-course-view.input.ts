import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutCourse_viewInput } from './user-create-without-course-view.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutCourse_viewInput } from './user-create-or-connect-without-course-view.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutCourse_viewInput {

    @Field(() => UserCreateWithoutCourse_viewInput, {nullable:true})
    @Type(() => UserCreateWithoutCourse_viewInput)
    create?: UserCreateWithoutCourse_viewInput;

    @Field(() => UserCreateOrConnectWithoutCourse_viewInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutCourse_viewInput)
    connectOrCreate?: UserCreateOrConnectWithoutCourse_viewInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;
}
