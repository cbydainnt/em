import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserLessonProgressCreateInput } from './user-lesson-progress-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneUserLessonProgressArgs {

    @Field(() => UserLessonProgressCreateInput, {nullable:false})
    @Type(() => UserLessonProgressCreateInput)
    data!: UserLessonProgressCreateInput;
}
