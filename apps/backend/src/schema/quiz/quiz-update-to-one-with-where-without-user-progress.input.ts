import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizWhereInput } from './quiz-where.input';
import { Type } from 'class-transformer';
import { QuizUpdateWithoutUser_progressInput } from './quiz-update-without-user-progress.input';

@InputType()
export class QuizUpdateToOneWithWhereWithoutUser_progressInput {

    @Field(() => QuizWhereInput, {nullable:true})
    @Type(() => QuizWhereInput)
    where?: QuizWhereInput;

    @Field(() => QuizUpdateWithoutUser_progressInput, {nullable:false})
    @Type(() => QuizUpdateWithoutUser_progressInput)
    data!: QuizUpdateWithoutUser_progressInput;
}
