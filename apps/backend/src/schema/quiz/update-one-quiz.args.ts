import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { QuizUpdateInput } from './quiz-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { QuizWhereUniqueInput } from './quiz-where-unique.input';

@ArgsType()
export class UpdateOneQuizArgs {

    @Field(() => QuizUpdateInput, {nullable:false})
    @Type(() => QuizUpdateInput)
    data!: QuizUpdateInput;

    @Field(() => QuizWhereUniqueInput, {nullable:false})
    @Type(() => QuizWhereUniqueInput)
    where!: Prisma.AtLeast<QuizWhereUniqueInput, 'quiz_id'>;
}
