import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserLessonProgressCreateManyLessonInput } from './user-lesson-progress-create-many-lesson.input';
import { Type } from 'class-transformer';

@InputType()
export class UserLessonProgressCreateManyLessonInputEnvelope {

    @Field(() => [UserLessonProgressCreateManyLessonInput], {nullable:false})
    @Type(() => UserLessonProgressCreateManyLessonInput)
    data!: Array<UserLessonProgressCreateManyLessonInput>;
}
