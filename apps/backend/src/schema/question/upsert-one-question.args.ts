import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { QuestionWhereUniqueInput } from './question-where-unique.input';
import { Type } from 'class-transformer';
import { QuestionCreateInput } from './question-create.input';
import { QuestionUpdateInput } from './question-update.input';

@ArgsType()
export class UpsertOneQuestionArgs {

    @Field(() => QuestionWhereUniqueInput, {nullable:false})
    @Type(() => QuestionWhereUniqueInput)
    where!: Prisma.AtLeast<QuestionWhereUniqueInput, 'question_id'>;

    @Field(() => QuestionCreateInput, {nullable:false})
    @Type(() => QuestionCreateInput)
    create!: QuestionCreateInput;

    @Field(() => QuestionUpdateInput, {nullable:false})
    @Type(() => QuestionUpdateInput)
    update!: QuestionUpdateInput;
}
