import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserLessonProgressCreateManyUserInput } from './user-lesson-progress-create-many-user.input';
import { Type } from 'class-transformer';

@InputType()
export class UserLessonProgressCreateManyUserInputEnvelope {

    @Field(() => [UserLessonProgressCreateManyUserInput], {nullable:false})
    @Type(() => UserLessonProgressCreateManyUserInput)
    data!: Array<UserLessonProgressCreateManyUserInput>;
}
