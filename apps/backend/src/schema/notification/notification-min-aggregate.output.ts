import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class NotificationMinAggregate {

    @Field(() => String, {nullable:true})
    notification_id?: string;

    @Field(() => String, {nullable:true})
    user_id?: string;

    @Field(() => String, {nullable:true})
    user_type?: string;

    @Field(() => String, {nullable:true})
    title?: string;

    @Field(() => String, {nullable:true})
    message?: string;

    @Field(() => Int, {nullable:true})
    type?: number;

    @Field(() => String, {nullable:true})
    context?: string;

    @Field(() => String, {nullable:true})
    action_url?: string;

    @Field(() => Int, {nullable:true})
    status?: number;

    @Field(() => String, {nullable:true})
    course_id?: string;

    @Field(() => String, {nullable:true})
    lesson_id?: string;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;

    @Field(() => Boolean, {nullable:true})
    del_flg?: boolean;
}
