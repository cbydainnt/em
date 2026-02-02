import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { NotificationCountAggregate } from './notification-count-aggregate.output';
import { NotificationAvgAggregate } from './notification-avg-aggregate.output';
import { NotificationSumAggregate } from './notification-sum-aggregate.output';
import { NotificationMinAggregate } from './notification-min-aggregate.output';
import { NotificationMaxAggregate } from './notification-max-aggregate.output';

@ObjectType()
export class NotificationGroupBy {

    @Field(() => String, {nullable:false})
    notification_id!: string;

    @Field(() => String, {nullable:true})
    user_id?: string;

    @Field(() => String, {nullable:true})
    user_type?: string;

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => String, {nullable:false})
    message!: string;

    @Field(() => Int, {nullable:false})
    type!: number;

    @Field(() => String, {nullable:true})
    context?: string;

    @Field(() => String, {nullable:true})
    action_url?: string;

    @Field(() => Int, {nullable:false})
    status!: number;

    @Field(() => String, {nullable:true})
    course_id?: string;

    @Field(() => String, {nullable:true})
    lesson_id?: string;

    @Field(() => Date, {nullable:false})
    created_at!: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;

    @Field(() => Boolean, {nullable:false})
    del_flg!: boolean;

    @Field(() => NotificationCountAggregate, {nullable:true})
    _count?: NotificationCountAggregate;

    @Field(() => NotificationAvgAggregate, {nullable:true})
    _avg?: NotificationAvgAggregate;

    @Field(() => NotificationSumAggregate, {nullable:true})
    _sum?: NotificationSumAggregate;

    @Field(() => NotificationMinAggregate, {nullable:true})
    _min?: NotificationMinAggregate;

    @Field(() => NotificationMaxAggregate, {nullable:true})
    _max?: NotificationMaxAggregate;
}
