import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ReportCommentCreateManyInput {

    @Field(() => String, {nullable:true})
    comment_id?: string;

    @Field(() => String, {nullable:false})
    report_id!: string;

    @Field(() => String, {nullable:true})
    user_id?: string;

    @Field(() => String, {nullable:false})
    content!: string;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;
}
