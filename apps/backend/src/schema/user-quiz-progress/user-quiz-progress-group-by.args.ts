import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserQuizProgressWhereInput } from './user-quiz-progress-where.input';
import { Type } from 'class-transformer';
import { UserQuizProgressOrderByWithAggregationInput } from './user-quiz-progress-order-by-with-aggregation.input';
import { UserQuizProgressScalarFieldEnum } from './user-quiz-progress-scalar-field.enum';
import { UserQuizProgressScalarWhereWithAggregatesInput } from './user-quiz-progress-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { UserQuizProgressCountAggregateInput } from './user-quiz-progress-count-aggregate.input';
import { UserQuizProgressAvgAggregateInput } from './user-quiz-progress-avg-aggregate.input';
import { UserQuizProgressSumAggregateInput } from './user-quiz-progress-sum-aggregate.input';
import { UserQuizProgressMinAggregateInput } from './user-quiz-progress-min-aggregate.input';
import { UserQuizProgressMaxAggregateInput } from './user-quiz-progress-max-aggregate.input';

@ArgsType()
export class UserQuizProgressGroupByArgs {

    @Field(() => UserQuizProgressWhereInput, {nullable:true})
    @Type(() => UserQuizProgressWhereInput)
    where?: UserQuizProgressWhereInput;

    @Field(() => [UserQuizProgressOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<UserQuizProgressOrderByWithAggregationInput>;

    @Field(() => [UserQuizProgressScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof UserQuizProgressScalarFieldEnum>;

    @Field(() => UserQuizProgressScalarWhereWithAggregatesInput, {nullable:true})
    having?: UserQuizProgressScalarWhereWithAggregatesInput;

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
