import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutUser_lesson_progressInput } from './user-update-without-user-lesson-progress.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutUser_lesson_progressInput {

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;

    @Field(() => UserUpdateWithoutUser_lesson_progressInput, {nullable:false})
    @Type(() => UserUpdateWithoutUser_lesson_progressInput)
    data!: UserUpdateWithoutUser_lesson_progressInput;
}
