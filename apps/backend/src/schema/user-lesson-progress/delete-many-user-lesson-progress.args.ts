import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserLessonProgressWhereInput } from './user-lesson-progress-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyUserLessonProgressArgs {

    @Field(() => UserLessonProgressWhereInput, {nullable:true})
    @Type(() => UserLessonProgressWhereInput)
    where?: UserLessonProgressWhereInput;
}
