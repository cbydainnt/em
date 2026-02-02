import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizUpdateWithoutQuiz_lessonsInput } from './quiz-update-without-quiz-lessons.input';
import { Type } from 'class-transformer';
import { QuizCreateWithoutQuiz_lessonsInput } from './quiz-create-without-quiz-lessons.input';
import { QuizWhereInput } from './quiz-where.input';

@InputType()
export class QuizUpsertWithoutQuiz_lessonsInput {

    @Field(() => QuizUpdateWithoutQuiz_lessonsInput, {nullable:false})
    @Type(() => QuizUpdateWithoutQuiz_lessonsInput)
    update!: QuizUpdateWithoutQuiz_lessonsInput;

    @Field(() => QuizCreateWithoutQuiz_lessonsInput, {nullable:false})
    @Type(() => QuizCreateWithoutQuiz_lessonsInput)
    create!: QuizCreateWithoutQuiz_lessonsInput;

    @Field(() => QuizWhereInput, {nullable:true})
    @Type(() => QuizWhereInput)
    where?: QuizWhereInput;
}
