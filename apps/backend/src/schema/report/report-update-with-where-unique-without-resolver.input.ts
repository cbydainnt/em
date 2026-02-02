import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ReportWhereUniqueInput } from './report-where-unique.input';
import { Type } from 'class-transformer';
import { ReportUpdateWithoutResolverInput } from './report-update-without-resolver.input';

@InputType()
export class ReportUpdateWithWhereUniqueWithoutResolverInput {

    @Field(() => ReportWhereUniqueInput, {nullable:false})
    @Type(() => ReportWhereUniqueInput)
    where!: Prisma.AtLeast<ReportWhereUniqueInput, 'report_id'>;

    @Field(() => ReportUpdateWithoutResolverInput, {nullable:false})
    @Type(() => ReportUpdateWithoutResolverInput)
    data!: ReportUpdateWithoutResolverInput;
}
