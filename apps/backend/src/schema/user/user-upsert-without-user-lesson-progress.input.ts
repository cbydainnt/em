import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateWithoutUser_lesson_progressInput } from './user-update-without-user-lesson-progress.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutUser_lesson_progressInput } from './user-create-without-user-lesson-progress.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutUser_lesson_progressInput {

    @Field(() => UserUpdateWithoutUser_lesson_progressInput, {nullable:false})
    @Type(() => UserUpdateWithoutUser_lesson_progressInput)
    update!: UserUpdateWithoutUser_lesson_progressInput;

    @Field(() => UserCreateWithoutUser_lesson_progressInput, {nullable:false})
    @Type(() => UserCreateWithoutUser_lesson_progressInput)
    create!: UserCreateWithoutUser_lesson_progressInput;

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;
}
