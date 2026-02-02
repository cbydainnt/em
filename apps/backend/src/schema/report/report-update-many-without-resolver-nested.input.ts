import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReportCreateWithoutResolverInput } from './report-create-without-resolver.input';
import { Type } from 'class-transformer';
import { ReportCreateOrConnectWithoutResolverInput } from './report-create-or-connect-without-resolver.input';
import { ReportUpsertWithWhereUniqueWithoutResolverInput } from './report-upsert-with-where-unique-without-resolver.input';
import { ReportCreateManyResolverInputEnvelope } from './report-create-many-resolver-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ReportWhereUniqueInput } from './report-where-unique.input';
import { ReportUpdateWithWhereUniqueWithoutResolverInput } from './report-update-with-where-unique-without-resolver.input';
import { ReportUpdateManyWithWhereWithoutResolverInput } from './report-update-many-with-where-without-resolver.input';
import { ReportScalarWhereInput } from './report-scalar-where.input';

@InputType()
export class ReportUpdateManyWithoutResolverNestedInput {

    @Field(() => [ReportCreateWithoutResolverInput], {nullable:true})
    @Type(() => ReportCreateWithoutResolverInput)
    create?: Array<ReportCreateWithoutResolverInput>;

    @Field(() => [ReportCreateOrConnectWithoutResolverInput], {nullable:true})
    @Type(() => ReportCreateOrConnectWithoutResolverInput)
    connectOrCreate?: Array<ReportCreateOrConnectWithoutResolverInput>;

    @Field(() => [ReportUpsertWithWhereUniqueWithoutResolverInput], {nullable:true})
    @Type(() => ReportUpsertWithWhereUniqueWithoutResolverInput)
    upsert?: Array<ReportUpsertWithWhereUniqueWithoutResolverInput>;

    @Field(() => ReportCreateManyResolverInputEnvelope, {nullable:true})
    @Type(() => ReportCreateManyResolverInputEnvelope)
    createMany?: ReportCreateManyResolverInputEnvelope;

    @Field(() => [ReportWhereUniqueInput], {nullable:true})
    @Type(() => ReportWhereUniqueInput)
    set?: Array<Prisma.AtLeast<ReportWhereUniqueInput, 'report_id'>>;

    @Field(() => [ReportWhereUniqueInput], {nullable:true})
    @Type(() => ReportWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<ReportWhereUniqueInput, 'report_id'>>;

    @Field(() => [ReportWhereUniqueInput], {nullable:true})
    @Type(() => ReportWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<ReportWhereUniqueInput, 'report_id'>>;

    @Field(() => [ReportWhereUniqueInput], {nullable:true})
    @Type(() => ReportWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ReportWhereUniqueInput, 'report_id'>>;

    @Field(() => [ReportUpdateWithWhereUniqueWithoutResolverInput], {nullable:true})
    @Type(() => ReportUpdateWithWhereUniqueWithoutResolverInput)
    update?: Array<ReportUpdateWithWhereUniqueWithoutResolverInput>;

    @Field(() => [ReportUpdateManyWithWhereWithoutResolverInput], {nullable:true})
    @Type(() => ReportUpdateManyWithWhereWithoutResolverInput)
    updateMany?: Array<ReportUpdateManyWithWhereWithoutResolverInput>;

    @Field(() => [ReportScalarWhereInput], {nullable:true})
    @Type(() => ReportScalarWhereInput)
    deleteMany?: Array<ReportScalarWhereInput>;
}
