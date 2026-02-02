import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReportCreateNestedOneWithoutCommentsInput } from '../report/report-create-nested-one-without-comments.input';

@InputType()
export class ReportCommentCreateWithoutUserInput {

    @Field(() => String, {nullable:true})
    comment_id?: string;

    @Field(() => String, {nullable:false})
    content!: string;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => ReportCreateNestedOneWithoutCommentsInput, {nullable:false})
    report!: ReportCreateNestedOneWithoutCommentsInput;
}
