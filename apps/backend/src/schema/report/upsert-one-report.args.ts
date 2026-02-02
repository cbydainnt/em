import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ReportWhereUniqueInput } from './report-where-unique.input';
import { Type } from 'class-transformer';
import { ReportCreateInput } from './report-create.input';
import { ReportUpdateInput } from './report-update.input';

@ArgsType()
export class UpsertOneReportArgs {

    @Field(() => ReportWhereUniqueInput, {nullable:false})
    @Type(() => ReportWhereUniqueInput)
    where!: Prisma.AtLeast<ReportWhereUniqueInput, 'report_id'>;

    @Field(() => ReportCreateInput, {nullable:false})
    @Type(() => ReportCreateInput)
    create!: ReportCreateInput;

    @Field(() => ReportUpdateInput, {nullable:false})
    @Type(() => ReportUpdateInput)
    update!: ReportUpdateInput;
}
