import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizCreateManyCourseInput } from './quiz-create-many-course.input';
import { Type } from 'class-transformer';

@InputType()
export class QuizCreateManyCourseInputEnvelope {

    @Field(() => [QuizCreateManyCourseInput], {nullable:false})
    @Type(() => QuizCreateManyCourseInput)
    data!: Array<QuizCreateManyCourseInput>;
}
