import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizUpdateWithoutQuiz_versionsInput } from './quiz-update-without-quiz-versions.input';
import { Type } from 'class-transformer';
import { QuizCreateWithoutQuiz_versionsInput } from './quiz-create-without-quiz-versions.input';
import { QuizWhereInput } from './quiz-where.input';

@InputType()
export class QuizUpsertWithoutQuiz_versionsInput {

    @Field(() => QuizUpdateWithoutQuiz_versionsInput, {nullable:false})
    @Type(() => QuizUpdateWithoutQuiz_versionsInput)
    update!: QuizUpdateWithoutQuiz_versionsInput;

    @Field(() => QuizCreateWithoutQuiz_versionsInput, {nullable:false})
    @Type(() => QuizCreateWithoutQuiz_versionsInput)
    create!: QuizCreateWithoutQuiz_versionsInput;

    @Field(() => QuizWhereInput, {nullable:true})
    @Type(() => QuizWhereInput)
    where?: QuizWhereInput;
}
