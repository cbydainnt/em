import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutUser_coursesInput } from './user-create-without-user-courses.input';

@InputType()
export class UserCreateOrConnectWithoutUser_coursesInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserCreateWithoutUser_coursesInput, {nullable:false})
    @Type(() => UserCreateWithoutUser_coursesInput)
    create!: UserCreateWithoutUser_coursesInput;
}
