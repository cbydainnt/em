import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserLessonProgressCreateManyInput } from './user-lesson-progress-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyUserLessonProgressArgs {

    @Field(() => [UserLessonProgressCreateManyInput], {nullable:false})
    @Type(() => UserLessonProgressCreateManyInput)
    data!: Array<UserLessonProgressCreateManyInput>;
}
