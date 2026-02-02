import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserNotificationUser_idNotification_idCompoundUniqueInput } from './user-notification-user-id-notification-id-compound-unique.input';
import { UserNotificationWhereInput } from './user-notification-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { UserRelationFilter } from '../user/user-relation-filter.input';
import { NotificationRelationFilter } from '../notification/notification-relation-filter.input';

@InputType()
export class UserNotificationWhereUniqueInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => UserNotificationUser_idNotification_idCompoundUniqueInput, {nullable:true})
    user_id_notification_id?: UserNotificationUser_idNotification_idCompoundUniqueInput;

    @Field(() => [UserNotificationWhereInput], {nullable:true})
    AND?: Array<UserNotificationWhereInput>;

    @Field(() => [UserNotificationWhereInput], {nullable:true})
    OR?: Array<UserNotificationWhereInput>;

    @Field(() => [UserNotificationWhereInput], {nullable:true})
    NOT?: Array<UserNotificationWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    user_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    notification_id?: StringFilter;

    @Field(() => IntFilter, {nullable:true})
    status?: IntFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    read_at?: DateTimeNullableFilter;

    @Field(() => UserRelationFilter, {nullable:true})
    user?: UserRelationFilter;

    @Field(() => NotificationRelationFilter, {nullable:true})
    notification?: NotificationRelationFilter;
}
