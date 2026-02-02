import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LessonQuizWhereInput } from './lesson-quiz-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyLessonQuizArgs {

    @Field(() => LessonQuizWhereInput, {nullable:true})
    @Type(() => LessonQuizWhereInput)
    where?: LessonQuizWhereInput;
}
