import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutUser_lesson_progressInput } from './user-create-without-user-lesson-progress.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutUser_lesson_progressInput } from './user-create-or-connect-without-user-lesson-progress.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutUser_lesson_progressInput {

    @Field(() => UserCreateWithoutUser_lesson_progressInput, {nullable:true})
    @Type(() => UserCreateWithoutUser_lesson_progressInput)
    create?: UserCreateWithoutUser_lesson_progressInput;

    @Field(() => UserCreateOrConnectWithoutUser_lesson_progressInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutUser_lesson_progressInput)
    connectOrCreate?: UserCreateOrConnectWithoutUser_lesson_progressInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;
}
