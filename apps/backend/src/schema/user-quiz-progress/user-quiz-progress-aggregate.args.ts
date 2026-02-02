import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserQuizProgressWhereInput } from './user-quiz-progress-where.input';
import { Type } from 'class-transformer';
import { UserQuizProgressOrderByWithRelationInput } from './user-quiz-progress-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { UserQuizProgressWhereUniqueInput } from './user-quiz-progress-where-unique.input';
import { Int } from '@nestjs/graphql';
import { UserQuizProgressCountAggregateInput } from './user-quiz-progress-count-aggregate.input';
import { UserQuizProgressAvgAggregateInput } from './user-quiz-progress-avg-aggregate.input';
import { UserQuizProgressSumAggregateInput } from './user-quiz-progress-sum-aggregate.input';
import { UserQuizProgressMinAggregateInput } from './user-quiz-progress-min-aggregate.input';
import { UserQuizProgressMaxAggregateInput } from './user-quiz-progress-max-aggregate.input';

@ArgsType()
export class UserQuizProgressAggregateArgs {

    @Field(() => UserQuizProgressWhereInput, {nullable:true})
    @Type(() => UserQuizProgressWhereInput)
    where?: UserQuizProgressWhereInput;

    @Field(() => [UserQuizProgressOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<UserQuizProgressOrderByWithRelationInput>;

    @Field(() => UserQuizProgressWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<UserQuizProgressWhereUniqueInput, 'progress_id' | 'user_id_quiz_id_lesson_id_attempts'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => UserQuizProgressCountAggregateInput, {nullable:true})
    _count?: UserQuizProgressCountAggregateInput;

    @Field(() => UserQuizProgressAvgAggregateInput, {nullable:true})
    _avg?: UserQuizProgressAvgAggregateInput;

    @Field(() => UserQuizProgressSumAggregateInput, {nullable:true})
    _sum?: UserQuizProgressSumAggregateInput;

    @Field(() => UserQuizProgressMinAggregateInput, {nullable:true})
    _min?: UserQuizProgressMinAggregateInput;

    @Field(() => UserQuizProgressMaxAggregateInput, {nullable:true})
    _max?: UserQuizProgressMaxAggregateInput;
}
