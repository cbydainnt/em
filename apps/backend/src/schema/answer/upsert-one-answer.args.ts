import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { AnswerWhereUniqueInput } from './answer-where-unique.input';
import { Type } from 'class-transformer';
import { AnswerCreateInput } from './answer-create.input';
import { AnswerUpdateInput } from './answer-update.input';

@ArgsType()
export class UpsertOneAnswerArgs {

    @Field(() => AnswerWhereUniqueInput, {nullable:false})
    @Type(() => AnswerWhereUniqueInput)
    where!: Prisma.AtLeast<AnswerWhereUniqueInput, 'answer_id'>;

    @Field(() => AnswerCreateInput, {nullable:false})
    @Type(() => AnswerCreateInput)
    create!: AnswerCreateInput;

    @Field(() => AnswerUpdateInput, {nullable:false})
    @Type(() => AnswerUpdateInput)
    update!: AnswerUpdateInput;
}
