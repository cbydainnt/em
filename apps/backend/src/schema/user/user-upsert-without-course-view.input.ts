import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateWithoutCourse_viewInput } from './user-update-without-course-view.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutCourse_viewInput } from './user-create-without-course-view.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutCourse_viewInput {

    @Field(() => UserUpdateWithoutCourse_viewInput, {nullable:false})
    @Type(() => UserUpdateWithoutCourse_viewInput)
    update!: UserUpdateWithoutCourse_viewInput;

    @Field(() => UserCreateWithoutCourse_viewInput, {nullable:false})
    @Type(() => UserCreateWithoutCourse_viewInput)
    create!: UserCreateWithoutCourse_viewInput;

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;
}
