import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserQuizAnswerWhereInput } from './user-quiz-answer-where.input';
import { Type } from 'class-transformer';
import { UserQuizAnswerOrderByWithRelationInput } from './user-quiz-answer-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { UserQuizAnswerWhereUniqueInput } from './user-quiz-answer-where-unique.input';
import { Int } from '@nestjs/graphql';
import { UserQuizAnswerCountAggregateInput } from './user-quiz-answer-count-aggregate.input';
import { UserQuizAnswerAvgAggregateInput } from './user-quiz-answer-avg-aggregate.input';
import { UserQuizAnswerSumAggregateInput } from './user-quiz-answer-sum-aggregate.input';
import { UserQuizAnswerMinAggregateInput } from './user-quiz-answer-min-aggregate.input';
import { UserQuizAnswerMaxAggregateInput } from './user-quiz-answer-max-aggregate.input';

@ArgsType()
export class UserQuizAnswerAggregateArgs {

    @Field(() => UserQuizAnswerWhereInput, {nullable:true})
    @Type(() => UserQuizAnswerWhereInput)
    where?: UserQuizAnswerWhereInput;

    @Field(() => [UserQuizAnswerOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<UserQuizAnswerOrderByWithRelationInput>;

    @Field(() => UserQuizAnswerWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<UserQuizAnswerWhereUniqueInput, 'id' | 'progress_id_question_id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => UserQuizAnswerCountAggregateInput, {nullable:true})
    _count?: UserQuizAnswerCountAggregateInput;

    @Field(() => UserQuizAnswerAvgAggregateInput, {nullable:true})
    _avg?: UserQuizAnswerAvgAggregateInput;

    @Field(() => UserQuizAnswerSumAggregateInput, {nullable:true})
    _sum?: UserQuizAnswerSumAggregateInput;

    @Field(() => UserQuizAnswerMinAggregateInput, {nullable:true})
    _min?: UserQuizAnswerMinAggregateInput;

    @Field(() => UserQuizAnswerMaxAggregateInput, {nullable:true})
    _max?: UserQuizAnswerMaxAggregateInput;
}
