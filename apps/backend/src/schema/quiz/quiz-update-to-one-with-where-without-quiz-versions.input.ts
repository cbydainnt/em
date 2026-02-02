import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizWhereInput } from './quiz-where.input';
import { Type } from 'class-transformer';
import { QuizUpdateWithoutQuiz_versionsInput } from './quiz-update-without-quiz-versions.input';

@InputType()
export class QuizUpdateToOneWithWhereWithoutQuiz_versionsInput {

    @Field(() => QuizWhereInput, {nullable:true})
    @Type(() => QuizWhereInput)
    where?: QuizWhereInput;

    @Field(() => QuizUpdateWithoutQuiz_versionsInput, {nullable:false})
    @Type(() => QuizUpdateWithoutQuiz_versionsInput)
    data!: QuizUpdateWithoutQuiz_versionsInput;
}
