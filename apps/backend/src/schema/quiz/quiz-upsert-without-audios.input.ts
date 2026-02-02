import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizUpdateWithoutAudiosInput } from './quiz-update-without-audios.input';
import { Type } from 'class-transformer';
import { QuizCreateWithoutAudiosInput } from './quiz-create-without-audios.input';
import { QuizWhereInput } from './quiz-where.input';

@InputType()
export class QuizUpsertWithoutAudiosInput {

    @Field(() => QuizUpdateWithoutAudiosInput, {nullable:false})
    @Type(() => QuizUpdateWithoutAudiosInput)
    update!: QuizUpdateWithoutAudiosInput;

    @Field(() => QuizCreateWithoutAudiosInput, {nullable:false})
    @Type(() => QuizCreateWithoutAudiosInput)
    create!: QuizCreateWithoutAudiosInput;

    @Field(() => QuizWhereInput, {nullable:true})
    @Type(() => QuizWhereInput)
    where?: QuizWhereInput;
}
