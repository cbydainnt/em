import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizWhereInput } from './quiz-where.input';
import { Type } from 'class-transformer';
import { QuizUpdateWithoutQuiz_lessonsInput } from './quiz-update-without-quiz-lessons.input';

@InputType()
export class QuizUpdateToOneWithWhereWithoutQuiz_lessonsInput {

    @Field(() => QuizWhereInput, {nullable:true})
    @Type(() => QuizWhereInput)
    where?: QuizWhereInput;

    @Field(() => QuizUpdateWithoutQuiz_lessonsInput, {nullable:false})
    @Type(() => QuizUpdateWithoutQuiz_lessonsInput)
    data!: QuizUpdateWithoutQuiz_lessonsInput;
}
