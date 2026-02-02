import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizWhereInput } from './quiz-where.input';
import { Type } from 'class-transformer';
import { QuizUpdateWithoutAudiosInput } from './quiz-update-without-audios.input';

@InputType()
export class QuizUpdateToOneWithWhereWithoutAudiosInput {

    @Field(() => QuizWhereInput, {nullable:true})
    @Type(() => QuizWhereInput)
    where?: QuizWhereInput;

    @Field(() => QuizUpdateWithoutAudiosInput, {nullable:false})
    @Type(() => QuizUpdateWithoutAudiosInput)
    data!: QuizUpdateWithoutAudiosInput;
}
