import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserQuizProgressCreateManyLessonInput } from './user-quiz-progress-create-many-lesson.input';
import { Type } from 'class-transformer';

@InputType()
export class UserQuizProgressCreateManyLessonInputEnvelope {

    @Field(() => [UserQuizProgressCreateManyLessonInput], {nullable:false})
    @Type(() => UserQuizProgressCreateManyLessonInput)
    data!: Array<UserQuizProgressCreateManyLessonInput>;
}
