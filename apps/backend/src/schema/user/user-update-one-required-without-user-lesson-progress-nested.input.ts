import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutUser_lesson_progressInput } from './user-create-without-user-lesson-progress.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutUser_lesson_progressInput } from './user-create-or-connect-without-user-lesson-progress.input';
import { UserUpsertWithoutUser_lesson_progressInput } from './user-upsert-without-user-lesson-progress.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateToOneWithWhereWithoutUser_lesson_progressInput } from './user-update-to-one-with-where-without-user-lesson-progress.input';

@InputType()
export class UserUpdateOneRequiredWithoutUser_lesson_progressNestedInput {

    @Field(() => UserCreateWithoutUser_lesson_progressInput, {nullable:true})
    @Type(() => UserCreateWithoutUser_lesson_progressInput)
    create?: UserCreateWithoutUser_lesson_progressInput;

    @Field(() => UserCreateOrConnectWithoutUser_lesson_progressInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutUser_lesson_progressInput)
    connectOrCreate?: UserCreateOrConnectWithoutUser_lesson_progressInput;

    @Field(() => UserUpsertWithoutUser_lesson_progressInput, {nullable:true})
    @Type(() => UserUpsertWithoutUser_lesson_progressInput)
    upsert?: UserUpsertWithoutUser_lesson_progressInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserUpdateToOneWithWhereWithoutUser_lesson_progressInput, {nullable:true})
    @Type(() => UserUpdateToOneWithWhereWithoutUser_lesson_progressInput)
    update?: UserUpdateToOneWithWhereWithoutUser_lesson_progressInput;
}
