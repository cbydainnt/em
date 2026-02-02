import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReportCreateWithoutUserInput } from './report-create-without-user.input';
import { Type } from 'class-transformer';
import { ReportCreateOrConnectWithoutUserInput } from './report-create-or-connect-without-user.input';
import { ReportUpsertWithWhereUniqueWithoutUserInput } from './report-upsert-with-where-unique-without-user.input';
import { ReportCreateManyUserInputEnvelope } from './report-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ReportWhereUniqueInput } from './report-where-unique.input';
import { ReportUpdateWithWhereUniqueWithoutUserInput } from './report-update-with-where-unique-without-user.input';
import { ReportUpdateManyWithWhereWithoutUserInput } from './report-update-many-with-where-without-user.input';
import { ReportScalarWhereInput } from './report-scalar-where.input';

@InputType()
export class ReportUncheckedUpdateManyWithoutUserNestedInput {

    @Field(() => [ReportCreateWithoutUserInput], {nullable:true})
    @Type(() => ReportCreateWithoutUserInput)
    create?: Array<ReportCreateWithoutUserInput>;

    @Field(() => [ReportCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => ReportCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<ReportCreateOrConnectWithoutUserInput>;

    @Field(() => [ReportUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => ReportUpsertWithWhereUniqueWithoutUserInput)
    upsert?: Array<ReportUpsertWithWhereUniqueWithoutUserInput>;

    @Field(() => ReportCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => ReportCreateManyUserInputEnvelope)
    createMany?: ReportCreateManyUserInputEnvelope;

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

    @Field(() => [ReportUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => ReportUpdateWithWhereUniqueWithoutUserInput)
    update?: Array<ReportUpdateWithWhereUniqueWithoutUserInput>;

    @Field(() => [ReportUpdateManyWithWhereWithoutUserInput], {nullable:true})
    @Type(() => ReportUpdateManyWithWhereWithoutUserInput)
    updateMany?: Array<ReportUpdateManyWithWhereWithoutUserInput>;

    @Field(() => [ReportScalarWhereInput], {nullable:true})
    @Type(() => ReportScalarWhereInput)
    deleteMany?: Array<ReportScalarWhereInput>;
}
