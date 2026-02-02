import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutCourse_viewInput } from './user-update-without-course-view.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutCourse_viewInput {

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;

    @Field(() => UserUpdateWithoutCourse_viewInput, {nullable:false})
    @Type(() => UserUpdateWithoutCourse_viewInput)
    data!: UserUpdateWithoutCourse_viewInput;
}
