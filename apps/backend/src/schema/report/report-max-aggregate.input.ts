import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ReportMaxAggregateInput {

    @Field(() => Boolean, {nullable:true})
    report_id?: true;

    @Field(() => Boolean, {nullable:true})
    user_id?: true;

    @Field(() => Boolean, {nullable:true})
    course_id?: true;

    @Field(() => Boolean, {nullable:true})
    lesson_id?: true;

    @Field(() => Boolean, {nullable:true})
    report_type?: true;

    @Field(() => Boolean, {nullable:true})
    category?: true;

    @Field(() => Boolean, {nullable:true})
    title?: true;

    @Field(() => Boolean, {nullable:true})
    description?: true;

    @Field(() => Boolean, {nullable:true})
    status?: true;

    @Field(() => Boolean, {nullable:true})
    priority?: true;

    @Field(() => Boolean, {nullable:true})
    created_at?: true;

    @Field(() => Boolean, {nullable:true})
    updated_at?: true;

    @Field(() => Boolean, {nullable:true})
    resolved_at?: true;

    @Field(() => Boolean, {nullable:true})
    resolved_by?: true;

    @Field(() => Boolean, {nullable:true})
    resolution_notes?: true;

    @Field(() => Boolean, {nullable:true})
    is_anonymous?: true;

    @Field(() => Boolean, {nullable:true})
    allow_contact?: true;

    @Field(() => Boolean, {nullable:true})
    del_flg?: true;
}
