import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class ReportMinAggregate {

    @Field(() => String, {nullable:true})
    report_id?: string;

    @Field(() => String, {nullable:true})
    user_id?: string;

    @Field(() => String, {nullable:true})
    course_id?: string;

    @Field(() => String, {nullable:true})
    lesson_id?: string;

    @Field(() => Int, {nullable:true})
    report_type?: number;

    @Field(() => Int, {nullable:true})
    category?: number;

    @Field(() => String, {nullable:true})
    title?: string;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => Int, {nullable:true})
    status?: number;

    @Field(() => Int, {nullable:true})
    priority?: number;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;

    @Field(() => Date, {nullable:true})
    resolved_at?: Date | string;

    @Field(() => String, {nullable:true})
    resolved_by?: string;

    @Field(() => String, {nullable:true})
    resolution_notes?: string;

    @Field(() => Boolean, {nullable:true})
    is_anonymous?: boolean;

    @Field(() => Boolean, {nullable:true})
    allow_contact?: boolean;

    @Field(() => Boolean, {nullable:true})
    del_flg?: boolean;
}
