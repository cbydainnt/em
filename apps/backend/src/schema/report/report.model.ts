import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { Course } from '../course/course.model';
import { Lesson } from '../lesson/lesson.model';
import { ReportComment } from '../report-comment/report-comment.model';
import { ReportCount } from './report-count.output';

@ObjectType()
export class Report {

    @Field(() => ID, {nullable:false})
    report_id!: string;

    @Field(() => String, {nullable:true})
    user_id!: string | null;

    @Field(() => String, {nullable:true})
    course_id!: string | null;

    @Field(() => String, {nullable:true})
    lesson_id!: string | null;

    @Field(() => Int, {nullable:false,defaultValue:1})
    report_type!: number;

    @Field(() => Int, {nullable:false,defaultValue:1})
    category!: number;

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => String, {nullable:false})
    description!: string;

    @Field(() => [String], {nullable:true})
    screenshot_urls!: Array<string>;

    @Field(() => Int, {nullable:false,defaultValue:1})
    status!: number;

    @Field(() => Int, {nullable:false,defaultValue:2})
    priority!: number;

    @Field(() => Date, {nullable:false})
    created_at!: Date;

    @Field(() => Date, {nullable:false})
    updated_at!: Date;

    @Field(() => Date, {nullable:true})
    resolved_at!: Date | null;

    @Field(() => String, {nullable:true})
    resolved_by!: string | null;

    @Field(() => String, {nullable:true})
    resolution_notes!: string | null;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    is_anonymous!: boolean;

    @Field(() => Boolean, {nullable:false,defaultValue:true})
    allow_contact!: boolean;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    del_flg!: boolean;

    @Field(() => User, {nullable:true})
    user?: User | null;

    @Field(() => Course, {nullable:true})
    course?: Course | null;

    @Field(() => Lesson, {nullable:true})
    lesson?: Lesson | null;

    @Field(() => User, {nullable:true})
    resolver?: User | null;

    @Field(() => [ReportComment], {nullable:true})
    comments?: Array<ReportComment>;

    @Field(() => ReportCount, {nullable:false})
    _count?: ReportCount;
}
