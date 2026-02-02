import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutCourse_viewInput } from './user-create-without-course-view.input';

@InputType()
export class UserCreateOrConnectWithoutCourse_viewInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserCreateWithoutCourse_viewInput, {nullable:false})
    @Type(() => UserCreateWithoutCourse_viewInput)
    create!: UserCreateWithoutCourse_viewInput;
}
