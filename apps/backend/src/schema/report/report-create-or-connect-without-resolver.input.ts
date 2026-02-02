import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ReportWhereUniqueInput } from './report-where-unique.input';
import { Type } from 'class-transformer';
import { ReportCreateWithoutResolverInput } from './report-create-without-resolver.input';

@InputType()
export class ReportCreateOrConnectWithoutResolverInput {

    @Field(() => ReportWhereUniqueInput, {nullable:false})
    @Type(() => ReportWhereUniqueInput)
    where!: Prisma.AtLeast<ReportWhereUniqueInput, 'report_id'>;

    @Field(() => ReportCreateWithoutResolverInput, {nullable:false})
    @Type(() => ReportCreateWithoutResolverInput)
    create!: ReportCreateWithoutResolverInput;
}
