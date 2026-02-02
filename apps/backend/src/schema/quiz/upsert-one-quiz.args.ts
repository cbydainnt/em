import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { QuizWhereUniqueInput } from './quiz-where-unique.input';
import { Type } from 'class-transformer';
import { QuizCreateInput } from './quiz-create.input';
import { QuizUpdateInput } from './quiz-update.input';

@ArgsType()
export class UpsertOneQuizArgs {

    @Field(() => QuizWhereUniqueInput, {nullable:false})
    @Type(() => QuizWhereUniqueInput)
    where!: Prisma.AtLeast<QuizWhereUniqueInput, 'quiz_id'>;

    @Field(() => QuizCreateInput, {nullable:false})
    @Type(() => QuizCreateInput)
    create!: QuizCreateInput;

    @Field(() => QuizUpdateInput, {nullable:false})
    @Type(() => QuizUpdateInput)
    update!: QuizUpdateInput;
}
