import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserQuizProgressCreateManyCourseInput } from './user-quiz-progress-create-many-course.input';
import { Type } from 'class-transformer';

@InputType()
export class UserQuizProgressCreateManyCourseInputEnvelope {

    @Field(() => [UserQuizProgressCreateManyCourseInput], {nullable:false})
    @Type(() => UserQuizProgressCreateManyCourseInput)
    data!: Array<UserQuizProgressCreateManyCourseInput>;
}
