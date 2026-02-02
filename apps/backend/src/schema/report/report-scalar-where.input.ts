import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { StringNullableListFilter } from '../prisma/string-nullable-list-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';

@InputType()
export class ReportScalarWhereInput {

    @Field(() => [ReportScalarWhereInput], {nullable:true})
    AND?: Array<ReportScalarWhereInput>;

    @Field(() => [ReportScalarWhereInput], {nullable:true})
    OR?: Array<ReportScalarWhereInput>;

    @Field(() => [ReportScalarWhereInput], {nullable:true})
    NOT?: Array<ReportScalarWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    report_id?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    user_id?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    course_id?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    lesson_id?: StringNullableFilter;

    @Field(() => IntFilter, {nullable:true})
    report_type?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    category?: IntFilter;

    @Field(() => StringFilter, {nullable:true})
    title?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    description?: StringFilter;

    @Field(() => StringNullableListFilter, {nullable:true})
    screenshot_urls?: StringNullableListFilter;

    @Field(() => IntFilter, {nullable:true})
    status?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    priority?: IntFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    created_at?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updated_at?: DateTimeFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    resolved_at?: DateTimeNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    resolved_by?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    resolution_notes?: StringNullableFilter;

    @Field(() => BoolFilter, {nullable:true})
    is_anonymous?: BoolFilter;

    @Field(() => BoolFilter, {nullable:true})
    allow_contact?: BoolFilter;

    @Field(() => BoolFilter, {nullable:true})
    del_flg?: BoolFilter;
}
