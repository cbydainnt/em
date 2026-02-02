import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutUser_lesson_progressInput } from './user-create-without-user-lesson-progress.input';

@InputType()
export class UserCreateOrConnectWithoutUser_lesson_progressInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserCreateWithoutUser_lesson_progressInput, {nullable:false})
    @Type(() => UserCreateWithoutUser_lesson_progressInput)
    create!: UserCreateWithoutUser_lesson_progressInput;
}
