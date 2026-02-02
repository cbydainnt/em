import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { QuizUpdateManyMutationInput } from './quiz-update-many-mutation.input';
import { Type } from 'class-transformer';
import { QuizWhereInput } from './quiz-where.input';

@ArgsType()
export class UpdateManyQuizArgs {

    @Field(() => QuizUpdateManyMutationInput, {nullable:false})
    @Type(() => QuizUpdateManyMutationInput)
    data!: QuizUpdateManyMutationInput;

    @Field(() => QuizWhereInput, {nullable:true})
    @Type(() => QuizWhereInput)
    where?: QuizWhereInput;
}
