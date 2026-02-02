import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonQuizCreateManyLessonInput } from './lesson-quiz-create-many-lesson.input';
import { Type } from 'class-transformer';

@InputType()
export class LessonQuizCreateManyLessonInputEnvelope {

    @Field(() => [LessonQuizCreateManyLessonInput], {nullable:false})
    @Type(() => LessonQuizCreateManyLessonInput)
    data!: Array<LessonQuizCreateManyLessonInput>;
}
