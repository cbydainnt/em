import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateWithoutUser_coursesInput } from './user-update-without-user-courses.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutUser_coursesInput } from './user-create-without-user-courses.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutUser_coursesInput {

    @Field(() => UserUpdateWithoutUser_coursesInput, {nullable:false})
    @Type(() => UserUpdateWithoutUser_coursesInput)
    update!: UserUpdateWithoutUser_coursesInput;

    @Field(() => UserCreateWithoutUser_coursesInput, {nullable:false})
    @Type(() => UserCreateWithoutUser_coursesInput)
    create!: UserCreateWithoutUser_coursesInput;

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;
}
