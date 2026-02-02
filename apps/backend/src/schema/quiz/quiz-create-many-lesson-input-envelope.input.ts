import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizCreateManyLessonInput } from './quiz-create-many-lesson.input';
import { Type } from 'class-transformer';

@InputType()
export class QuizCreateManyLessonInputEnvelope {

    @Field(() => [QuizCreateManyLessonInput], {nullable:false})
    @Type(() => QuizCreateManyLessonInput)
    data!: Array<QuizCreateManyLessonInput>;
}
