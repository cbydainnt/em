import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LessonQuizCreateInput } from './lesson-quiz-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneLessonQuizArgs {

    @Field(() => LessonQuizCreateInput, {nullable:false})
    @Type(() => LessonQuizCreateInput)
    data!: LessonQuizCreateInput;
}
