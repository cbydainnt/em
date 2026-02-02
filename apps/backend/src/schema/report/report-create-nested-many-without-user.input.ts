import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReportCreateWithoutUserInput } from './report-create-without-user.input';
import { Type } from 'class-transformer';
import { ReportCreateOrConnectWithoutUserInput } from './report-create-or-connect-without-user.input';
import { ReportCreateManyUserInputEnvelope } from './report-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ReportWhereUniqueInput } from './report-where-unique.input';

@InputType()
export class ReportCreateNestedManyWithoutUserInput {

    @Field(() => [ReportCreateWithoutUserInput], {nullable:true})
    @Type(() => ReportCreateWithoutUserInput)
    create?: Array<ReportCreateWithoutUserInput>;

    @Field(() => [ReportCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => ReportCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<ReportCreateOrConnectWithoutUserInput>;

    @Field(() => ReportCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => ReportCreateManyUserInputEnvelope)
    createMany?: ReportCreateManyUserInputEnvelope;

    @Field(() => [ReportWhereUniqueInput], {nullable:true})
    @Type(() => ReportWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ReportWhereUniqueInput, 'report_id'>>;
}
