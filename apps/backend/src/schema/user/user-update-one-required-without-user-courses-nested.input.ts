import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutUser_coursesInput } from './user-create-without-user-courses.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutUser_coursesInput } from './user-create-or-connect-without-user-courses.input';
import { UserUpsertWithoutUser_coursesInput } from './user-upsert-without-user-courses.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateToOneWithWhereWithoutUser_coursesInput } from './user-update-to-one-with-where-without-user-courses.input';

@InputType()
export class UserUpdateOneRequiredWithoutUser_coursesNestedInput {

    @Field(() => UserCreateWithoutUser_coursesInput, {nullable:true})
    @Type(() => UserCreateWithoutUser_coursesInput)
    create?: UserCreateWithoutUser_coursesInput;

    @Field(() => UserCreateOrConnectWithoutUser_coursesInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutUser_coursesInput)
    connectOrCreate?: UserCreateOrConnectWithoutUser_coursesInput;

    @Field(() => UserUpsertWithoutUser_coursesInput, {nullable:true})
    @Type(() => UserUpsertWithoutUser_coursesInput)
    upsert?: UserUpsertWithoutUser_coursesInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserUpdateToOneWithWhereWithoutUser_coursesInput, {nullable:true})
    @Type(() => UserUpdateToOneWithWhereWithoutUser_coursesInput)
    update?: UserUpdateToOneWithWhereWithoutUser_coursesInput;
}
