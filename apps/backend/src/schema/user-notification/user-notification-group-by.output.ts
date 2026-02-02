import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { UserNotificationCountAggregate } from './user-notification-count-aggregate.output';
import { UserNotificationAvgAggregate } from './user-notification-avg-aggregate.output';
import { UserNotificationSumAggregate } from './user-notification-sum-aggregate.output';
import { UserNotificationMinAggregate } from './user-notification-min-aggregate.output';
import { UserNotificationMaxAggregate } from './user-notification-max-aggregate.output';

@ObjectType()
export class UserNotificationGroupBy {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    user_id!: string;

    @Field(() => String, {nullable:false})
    notification_id!: string;

    @Field(() => Int, {nullable:false})
    status!: number;

    @Field(() => Date, {nullable:true})
    read_at?: Date | string;

    @Field(() => UserNotificationCountAggregate, {nullable:true})
    _count?: UserNotificationCountAggregate;

    @Field(() => UserNotificationAvgAggregate, {nullable:true})
    _avg?: UserNotificationAvgAggregate;

    @Field(() => UserNotificationSumAggregate, {nullable:true})
    _sum?: UserNotificationSumAggregate;

    @Field(() => UserNotificationMinAggregate, {nullable:true})
    _min?: UserNotificationMinAggregate;

    @Field(() => UserNotificationMaxAggregate, {nullable:true})
    _max?: UserNotificationMaxAggregate;
}
