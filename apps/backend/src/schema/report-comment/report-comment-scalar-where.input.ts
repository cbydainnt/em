import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';

@InputType()
export class ReportCommentScalarWhereInput {

    @Field(() => [ReportCommentScalarWhereInput], {nullable:true})
    AND?: Array<ReportCommentScalarWhereInput>;

    @Field(() => [ReportCommentScalarWhereInput], {nullable:true})
    OR?: Array<ReportCommentScalarWhereInput>;

    @Field(() => [ReportCommentScalarWhereInput], {nullable:true})
    NOT?: Array<ReportCommentScalarWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    comment_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    report_id?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    user_id?: StringNullableFilter;

    @Field(() => StringFilter, {nullable:true})
    content?: StringFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    created_at?: DateTimeFilter;
}
