import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReportCreateNestedOneWithoutCommentsInput } from '../report/report-create-nested-one-without-comments.input';
import { UserCreateNestedOneWithoutReportCommentsInput } from '../user/user-create-nested-one-without-report-comments.input';

@InputType()
export class ReportCommentCreateInput {

    @Field(() => String, {nullable:true})
    comment_id?: string;

    @Field(() => String, {nullable:false})
    content!: string;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => ReportCreateNestedOneWithoutCommentsInput, {nullable:false})
    report!: ReportCreateNestedOneWithoutCommentsInput;

    @Field(() => UserCreateNestedOneWithoutReportCommentsInput, {nullable:true})
    user?: UserCreateNestedOneWithoutReportCommentsInput;
}
