import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { ReportRelationFilter } from '../report/report-relation-filter.input';
import { UserNullableRelationFilter } from '../user/user-nullable-relation-filter.input';

@InputType()
export class ReportCommentWhereInput {

    @Field(() => [ReportCommentWhereInput], {nullable:true})
    AND?: Array<ReportCommentWhereInput>;

    @Field(() => [ReportCommentWhereInput], {nullable:true})
    OR?: Array<ReportCommentWhereInput>;

    @Field(() => [ReportCommentWhereInput], {nullable:true})
    NOT?: Array<ReportCommentWhereInput>;

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

    @Field(() => ReportRelationFilter, {nullable:true})
    report?: ReportRelationFilter;

    @Field(() => UserNullableRelationFilter, {nullable:true})
    user?: UserNullableRelationFilter;
}
