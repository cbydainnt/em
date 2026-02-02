import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserCourseCreateManyInput } from './user-course-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyUserCourseArgs {

    @Field(() => [UserCourseCreateManyInput], {nullable:false})
    @Type(() => UserCourseCreateManyInput)
    data!: Array<UserCourseCreateManyInput>;
}
