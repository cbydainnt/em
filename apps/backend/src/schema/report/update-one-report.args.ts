import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ReportUpdateInput } from './report-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { ReportWhereUniqueInput } from './report-where-unique.input';

@ArgsType()
export class UpdateOneReportArgs {

    @Field(() => ReportUpdateInput, {nullable:false})
    @Type(() => ReportUpdateInput)
    data!: ReportUpdateInput;

    @Field(() => ReportWhereUniqueInput, {nullable:false})
    @Type(() => ReportWhereUniqueInput)
    where!: Prisma.AtLeast<ReportWhereUniqueInput, 'report_id'>;
}
