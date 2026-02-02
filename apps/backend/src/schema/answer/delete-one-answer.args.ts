import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { AnswerWhereUniqueInput } from './answer-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteOneAnswerArgs {

    @Field(() => AnswerWhereUniqueInput, {nullable:false})
    @Type(() => AnswerWhereUniqueInput)
    where!: Prisma.AtLeast<AnswerWhereUniqueInput, 'answer_id'>;
}
