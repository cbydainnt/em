import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { ReportCreatescreenshot_urlsInput } from './report-createscreenshot-urls.input';

@InputType()
export class ReportCreateManyInput {

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

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => String, {nullable:false})
    description!: string;

    @Field(() => ReportCreatescreenshot_urlsInput, {nullable:true})
    screenshot_urls?: ReportCreatescreenshot_urlsInput;

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
