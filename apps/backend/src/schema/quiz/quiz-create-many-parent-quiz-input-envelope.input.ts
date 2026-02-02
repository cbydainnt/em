import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizCreateManyParent_quizInput } from './quiz-create-many-parent-quiz.input';
import { Type } from 'class-transformer';

@InputType()
export class QuizCreateManyParent_quizInputEnvelope {

    @Field(() => [QuizCreateManyParent_quizInput], {nullable:false})
    @Type(() => QuizCreateManyParent_quizInput)
    data!: Array<QuizCreateManyParent_quizInput>;
}
