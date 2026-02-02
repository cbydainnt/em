import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AnswerWhereInput } from './answer-where.input';
import { Type } from 'class-transformer';
import { AnswerOrderByWithRelationInput } from './answer-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { AnswerWhereUniqueInput } from './answer-where-unique.input';
import { Int } from '@nestjs/graphql';
import { AnswerScalarFieldEnum } from './answer-scalar-field.enum';

@ArgsType()
export class FindFirstAnswerArgs {

    @Field(() => AnswerWhereInput, {nullable:true})
    @Type(() => AnswerWhereInput)
    where?: AnswerWhereInput;

    @Field(() => [AnswerOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<AnswerOrderByWithRelationInput>;

    @Field(() => AnswerWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<AnswerWhereUniqueInput, 'answer_id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [AnswerScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof AnswerScalarFieldEnum>;
}
