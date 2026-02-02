import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutUser_coursesInput } from './user-update-without-user-courses.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutUser_coursesInput {

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;

    @Field(() => UserUpdateWithoutUser_coursesInput, {nullable:false})
    @Type(() => UserUpdateWithoutUser_coursesInput)
    data!: UserUpdateWithoutUser_coursesInput;
}
