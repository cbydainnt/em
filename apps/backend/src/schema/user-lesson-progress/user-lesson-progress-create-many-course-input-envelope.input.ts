import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserLessonProgressCreateManyCourseInput } from './user-lesson-progress-create-many-course.input';
import { Type } from 'class-transformer';

@InputType()
export class UserLessonProgressCreateManyCourseInputEnvelope {

    @Field(() => [UserLessonProgressCreateManyCourseInput], {nullable:false})
    @Type(() => UserLessonProgressCreateManyCourseInput)
    data!: Array<UserLessonProgressCreateManyCourseInput>;
}
