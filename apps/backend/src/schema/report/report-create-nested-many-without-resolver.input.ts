import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReportCreateWithoutResolverInput } from './report-create-without-resolver.input';
import { Type } from 'class-transformer';
import { ReportCreateOrConnectWithoutResolverInput } from './report-create-or-connect-without-resolver.input';
import { ReportCreateManyResolverInputEnvelope } from './report-create-many-resolver-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ReportWhereUniqueInput } from './report-where-unique.input';

@InputType()
export class ReportCreateNestedManyWithoutResolverInput {

    @Field(() => [ReportCreateWithoutResolverInput], {nullable:true})
    @Type(() => ReportCreateWithoutResolverInput)
    create?: Array<ReportCreateWithoutResolverInput>;

    @Field(() => [ReportCreateOrConnectWithoutResolverInput], {nullable:true})
    @Type(() => ReportCreateOrConnectWithoutResolverInput)
    connectOrCreate?: Array<ReportCreateOrConnectWithoutResolverInput>;

    @Field(() => ReportCreateManyResolverInputEnvelope, {nullable:true})
    @Type(() => ReportCreateManyResolverInputEnvelope)
    createMany?: ReportCreateManyResolverInputEnvelope;

    @Field(() => [ReportWhereUniqueInput], {nullable:true})
    @Type(() => ReportWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ReportWhereUniqueInput, 'report_id'>>;
}
