import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';

@InputType()
export class NotificationScalarWhereInput {

    @Field(() => [NotificationScalarWhereInput], {nullable:true})
    AND?: Array<NotificationScalarWhereInput>;

    @Field(() => [NotificationScalarWhereInput], {nullable:true})
    OR?: Array<NotificationScalarWhereInput>;

    @Field(() => [NotificationScalarWhereInput], {nullable:true})
    NOT?: Array<NotificationScalarWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    notification_id?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    user_id?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    user_type?: StringNullableFilter;

    @Field(() => StringFilter, {nullable:true})
    title?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    message?: StringFilter;

    @Field(() => IntFilter, {nullable:true})
    type?: IntFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    context?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    action_url?: StringNullableFilter;

    @Field(() => IntFilter, {nullable:true})
    status?: IntFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    course_id?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    lesson_id?: StringNullableFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    created_at?: DateTimeFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    updated_at?: DateTimeNullableFilter;

    @Field(() => BoolFilter, {nullable:true})
    del_flg?: BoolFilter;
}
