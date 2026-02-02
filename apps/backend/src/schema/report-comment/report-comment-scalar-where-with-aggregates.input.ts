import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';

@InputType()
export class ReportCommentScalarWhereWithAggregatesInput {

    @Field(() => [ReportCommentScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<ReportCommentScalarWhereWithAggregatesInput>;

    @Field(() => [ReportCommentScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<ReportCommentScalarWhereWithAggregatesInput>;

    @Field(() => [ReportCommentScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<ReportCommentScalarWhereWithAggregatesInput>;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    comment_id?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    report_id?: StringWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    user_id?: StringNullableWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    content?: StringWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    created_at?: DateTimeWithAggregatesFilter;
}
