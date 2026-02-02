import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizUpdateWithoutUser_progressInput } from './quiz-update-without-user-progress.input';
import { Type } from 'class-transformer';
import { QuizCreateWithoutUser_progressInput } from './quiz-create-without-user-progress.input';
import { QuizWhereInput } from './quiz-where.input';

@InputType()
export class QuizUpsertWithoutUser_progressInput {

    @Field(() => QuizUpdateWithoutUser_progressInput, {nullable:false})
    @Type(() => QuizUpdateWithoutUser_progressInput)
    update!: QuizUpdateWithoutUser_progressInput;

    @Field(() => QuizCreateWithoutUser_progressInput, {nullable:false})
    @Type(() => QuizCreateWithoutUser_progressInput)
    create!: QuizCreateWithoutUser_progressInput;

    @Field(() => QuizWhereInput, {nullable:true})
    @Type(() => QuizWhereInput)
    where?: QuizWhereInput;
}
