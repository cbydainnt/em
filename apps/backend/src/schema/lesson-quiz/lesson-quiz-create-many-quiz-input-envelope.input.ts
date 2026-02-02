import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonQuizCreateManyQuizInput } from './lesson-quiz-create-many-quiz.input';
import { Type } from 'class-transformer';

@InputType()
export class LessonQuizCreateManyQuizInputEnvelope {

    @Field(() => [LessonQuizCreateManyQuizInput], {nullable:false})
    @Type(() => LessonQuizCreateManyQuizInput)
    data!: Array<LessonQuizCreateManyQuizInput>;
}
