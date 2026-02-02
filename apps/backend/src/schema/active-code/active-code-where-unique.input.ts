import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ActiveCodeWhereInput } from './active-code-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';

@InputType()
export class ActiveCodeWhereUniqueInput {

    @Field(() => String, {nullable:true})
    active_code_id?: string;

    @Field(() => [ActiveCodeWhereInput], {nullable:true})
    AND?: Array<ActiveCodeWhereInput>;

    @Field(() => [ActiveCodeWhereInput], {nullable:true})
    OR?: Array<ActiveCodeWhereInput>;

    @Field(() => [ActiveCodeWhereInput], {nullable:true})
    NOT?: Array<ActiveCodeWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    order_item_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    course_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    customer_id?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    combo_id?: StringNullableFilter;

    @Field(() => IntFilter, {nullable:true})
    item_type?: IntFilter;

    @Field(() => StringFilter, {nullable:true})
    code?: StringFilter;

    @Field(() => IntFilter, {nullable:true})
    status?: IntFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    created_at?: DateTimeFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    used_at?: DateTimeNullableFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    expires_at?: DateTimeNullableFilter;
}
