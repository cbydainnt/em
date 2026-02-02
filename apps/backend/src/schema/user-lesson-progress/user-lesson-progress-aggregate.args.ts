import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserLessonProgressWhereInput } from './user-lesson-progress-where.input';
import { Type } from 'class-transformer';
import { UserLessonProgressOrderByWithRelationInput } from './user-lesson-progress-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { UserLessonProgressWhereUniqueInput } from './user-lesson-progress-where-unique.input';
import { Int } from '@nestjs/graphql';
import { UserLessonProgressCountAggregateInput } from './user-lesson-progress-count-aggregate.input';
import { UserLessonProgressAvgAggregateInput } from './user-lesson-progress-avg-aggregate.input';
import { UserLessonProgressSumAggregateInput } from './user-lesson-progress-sum-aggregate.input';
import { UserLessonProgressMinAggregateInput } from './user-lesson-progress-min-aggregate.input';
import { UserLessonProgressMaxAggregateInput } from './user-lesson-progress-max-aggregate.input';

@ArgsType()
export class UserLessonProgressAggregateArgs {

    @Field(() => UserLessonProgressWhereInput, {nullable:true})
    @Type(() => UserLessonProgressWhereInput)
    where?: UserLessonProgressWhereInput;

    @Field(() => [UserLessonProgressOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<UserLessonProgressOrderByWithRelationInput>;

    @Field(() => UserLessonProgressWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<UserLessonProgressWhereUniqueInput, 'id' | 'user_id_lesson_id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => UserLessonProgressCountAggregateInput, {nullable:true})
    _count?: UserLessonProgressCountAggregateInput;

    @Field(() => UserLessonProgressAvgAggregateInput, {nullable:true})
    _avg?: UserLessonProgressAvgAggregateInput;

    @Field(() => UserLessonProgressSumAggregateInput, {nullable:true})
    _sum?: UserLessonProgressSumAggregateInput;

    @Field(() => UserLessonProgressMinAggregateInput, {nullable:true})
    _min?: UserLessonProgressMinAggregateInput;

    @Field(() => UserLessonProgressMaxAggregateInput, {nullable:true})
    _max?: UserLessonProgressMaxAggregateInput;
}
