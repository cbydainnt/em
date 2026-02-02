import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReportCommentMinAggregate {

    @Field(() => String, {nullable:true})
    comment_id?: string;

    @Field(() => String, {nullable:true})
    report_id?: string;

    @Field(() => String, {nullable:true})
    user_id?: string;

    @Field(() => String, {nullable:true})
    content?: string;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;
}
