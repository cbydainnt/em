import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LessonQuizCreateManyInput } from './lesson-quiz-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyLessonQuizArgs {

    @Field(() => [LessonQuizCreateManyInput], {nullable:false})
    @Type(() => LessonQuizCreateManyInput)
    data!: Array<LessonQuizCreateManyInput>;
}
