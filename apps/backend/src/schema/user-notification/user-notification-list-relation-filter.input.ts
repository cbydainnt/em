import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserNotificationWhereInput } from './user-notification-where.input';

@InputType()
export class UserNotificationListRelationFilter {

    @Field(() => UserNotificationWhereInput, {nullable:true})
    every?: UserNotificationWhereInput;

    @Field(() => UserNotificationWhereInput, {nullable:true})
    some?: UserNotificationWhereInput;

    @Field(() => UserNotificationWhereInput, {nullable:true})
    none?: UserNotificationWhereInput;
}
