import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { ReportCreatescreenshot_urlsInput } from './report-createscreenshot-urls.input';
import { UserCreateNestedOneWithoutReportsInput } from '../user/user-create-nested-one-without-reports.input';
import { CourseCreateNestedOneWithoutReportsInput } from '../course/course-create-nested-one-without-reports.input';
import { UserCreateNestedOneWithoutResolved_reportsInput } from '../user/user-create-nested-one-without-resolved-reports.input';
import { ReportCommentCreateNestedManyWithoutReportInput } from '../report-comment/report-comment-create-nested-many-without-report.input';

@InputType()
export class ReportCreateWithoutLessonInput {

    @Field(() => String, {nullable:true})
    report_id?: string;

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
    resolution_notes?: string;

    @Field(() => Boolean, {nullable:true})
    is_anonymous?: boolean;

    @Field(() => Boolean, {nullable:true})
    allow_contact?: boolean;

    @Field(() => Boolean, {nullable:true})
    del_flg?: boolean;

    @Field(() => UserCreateNestedOneWithoutReportsInput, {nullable:true})
    user?: UserCreateNestedOneWithoutReportsInput;

    @Field(() => CourseCreateNestedOneWithoutReportsInput, {nullable:true})
    course?: CourseCreateNestedOneWithoutReportsInput;

    @Field(() => UserCreateNestedOneWithoutResolved_reportsInput, {nullable:true})
    resolver?: UserCreateNestedOneWithoutResolved_reportsInput;

    @Field(() => ReportCommentCreateNestedManyWithoutReportInput, {nullable:true})
    comments?: ReportCommentCreateNestedManyWithoutReportInput;
}
