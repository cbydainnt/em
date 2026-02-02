import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCourseCreateManyUserInput } from './user-course-create-many-user.input';
import { Type } from 'class-transformer';

@InputType()
export class UserCourseCreateManyUserInputEnvelope {

    @Field(() => [UserCourseCreateManyUserInput], {nullable:false})
    @Type(() => UserCourseCreateManyUserInput)
    data!: Array<UserCourseCreateManyUserInput>;
}
