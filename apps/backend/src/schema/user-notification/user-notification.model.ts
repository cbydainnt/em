import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { Notification } from '../notification/notification.model';

@ObjectType()
export class UserNotification {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    user_id!: string;

    @Field(() => String, {nullable:false})
    notification_id!: string;

    @Field(() => Int, {nullable:false,defaultValue:1})
    status!: number;

    @Field(() => Date, {nullable:true})
    read_at!: Date | null;

    @Field(() => User, {nullable:false})
    user?: User;

    @Field(() => Notification, {nullable:false})
    notification?: Notification;
}
