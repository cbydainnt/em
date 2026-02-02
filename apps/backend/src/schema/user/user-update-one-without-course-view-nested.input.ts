import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutCourse_viewInput } from './user-create-without-course-view.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutCourse_viewInput } from './user-create-or-connect-without-course-view.input';
import { UserUpsertWithoutCourse_viewInput } from './user-upsert-without-course-view.input';
import { UserWhereInput } from './user-where.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateToOneWithWhereWithoutCourse_viewInput } from './user-update-to-one-with-where-without-course-view.input';

@InputType()
export class UserUpdateOneWithoutCourse_viewNestedInput {

    @Field(() => UserCreateWithoutCourse_viewInput, {nullable:true})
    @Type(() => UserCreateWithoutCourse_viewInput)
    create?: UserCreateWithoutCourse_viewInput;

    @Field(() => UserCreateOrConnectWithoutCourse_viewInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutCourse_viewInput)
    connectOrCreate?: UserCreateOrConnectWithoutCourse_viewInput;

    @Field(() => UserUpsertWithoutCourse_viewInput, {nullable:true})
    @Type(() => UserUpsertWithoutCourse_viewInput)
    upsert?: UserUpsertWithoutCourse_viewInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    delete?: UserWhereInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserUpdateToOneWithWhereWithoutCourse_viewInput, {nullable:true})
    @Type(() => UserUpdateToOneWithWhereWithoutCourse_viewInput)
    update?: UserUpdateToOneWithWhereWithoutCourse_viewInput;
}
