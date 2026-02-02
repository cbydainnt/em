import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { ReportCountAggregate } from './report-count-aggregate.output';
import { ReportAvgAggregate } from './report-avg-aggregate.output';
import { ReportSumAggregate } from './report-sum-aggregate.output';
import { ReportMinAggregate } from './report-min-aggregate.output';
import { ReportMaxAggregate } from './report-max-aggregate.output';

@ObjectType()
export class ReportGroupBy {

    @Field(() => String, {nullable:false})
    report_id!: string;

    @Field(() => String, {nullable:true})
    user_id?: string;

    @Field(() => String, {nullable:true})
    course_id?: string;

    @Field(() => String, {nullable:true})
    lesson_id?: string;

    @Field(() => Int, {nullable:false})
    report_type!: number;

    @Field(() => Int, {nullable:false})
    category!: number;

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => String, {nullable:false})
    description!: string;

    @Field(() => [String], {nullable:true})
    screenshot_urls?: Array<string>;

    @Field(() => Int, {nullable:false})
    status!: number;

    @Field(() => Int, {nullable:false})
    priority!: number;

    @Field(() => Date, {nullable:false})
    created_at!: Date | string;

    @Field(() => Date, {nullable:false})
    updated_at!: Date | string;

    @Field(() => Date, {nullable:true})
    resolved_at?: Date | string;

    @Field(() => String, {nullable:true})
    resolved_by?: string;

    @Field(() => String, {nullable:true})
    resolution_notes?: string;

    @Field(() => Boolean, {nullable:false})
    is_anonymous!: boolean;

    @Field(() => Boolean, {nullable:false})
    allow_contact!: boolean;

    @Field(() => Boolean, {nullable:false})
    del_flg!: boolean;

    @Field(() => ReportCountAggregate, {nullable:true})
    _count?: ReportCountAggregate;

    @Field(() => ReportAvgAggregate, {nullable:true})
    _avg?: ReportAvgAggregate;

    @Field(() => ReportSumAggregate, {nullable:true})
    _sum?: ReportSumAggregate;

    @Field(() => ReportMinAggregate, {nullable:true})
    _min?: ReportMinAggregate;

    @Field(() => ReportMaxAggregate, {nullable:true})
    _max?: ReportMaxAggregate;
}
