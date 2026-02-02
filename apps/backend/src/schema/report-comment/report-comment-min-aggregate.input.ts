import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ReportCommentMinAggregateInput {

    @Field(() => Boolean, {nullable:true})
    comment_id?: true;

    @Field(() => Boolean, {nullable:true})
    report_id?: true;

    @Field(() => Boolean, {nullable:true})
    user_id?: true;

    @Field(() => Boolean, {nullable:true})
    content?: true;

    @Field(() => Boolean, {nullable:true})
    created_at?: true;
}
