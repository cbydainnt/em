import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';

@InputType()
export class UserNotificationScalarWhereInput {

    @Field(() => [UserNotificationScalarWhereInput], {nullable:true})
    AND?: Array<UserNotificationScalarWhereInput>;

    @Field(() => [UserNotificationScalarWhereInput], {nullable:true})
    OR?: Array<UserNotificationScalarWhereInput>;

    @Field(() => [UserNotificationScalarWhereInput], {nullable:true})
    NOT?: Array<UserNotificationScalarWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    user_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    notification_id?: StringFilter;

    @Field(() => IntFilter, {nullable:true})
    status?: IntFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    read_at?: DateTimeNullableFilter;
}
