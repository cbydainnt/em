import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCourseCreateManyCourseInput } from './user-course-create-many-course.input';
import { Type } from 'class-transformer';

@InputType()
export class UserCourseCreateManyCourseInputEnvelope {

    @Field(() => [UserCourseCreateManyCourseInput], {nullable:false})
    @Type(() => UserCourseCreateManyCourseInput)
    data!: Array<UserCourseCreateManyCourseInput>;
}
