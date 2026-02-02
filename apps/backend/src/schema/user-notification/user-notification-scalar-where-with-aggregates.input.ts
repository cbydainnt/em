import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { DateTimeNullableWithAggregatesFilter } from '../prisma/date-time-nullable-with-aggregates-filter.input';

@InputType()
export class UserNotificationScalarWhereWithAggregatesInput {

    @Field(() => [UserNotificationScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<UserNotificationScalarWhereWithAggregatesInput>;

    @Field(() => [UserNotificationScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<UserNotificationScalarWhereWithAggregatesInput>;

    @Field(() => [UserNotificationScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<UserNotificationScalarWhereWithAggregatesInput>;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    user_id?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    notification_id?: StringWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    status?: IntWithAggregatesFilter;

    @Field(() => DateTimeNullableWithAggregatesFilter, {nullable:true})
    read_at?: DateTimeNullableWithAggregatesFilter;
}
