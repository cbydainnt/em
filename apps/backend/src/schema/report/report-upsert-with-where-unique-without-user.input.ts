import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ReportWhereUniqueInput } from './report-where-unique.input';
import { Type } from 'class-transformer';
import { ReportUpdateWithoutUserInput } from './report-update-without-user.input';
import { ReportCreateWithoutUserInput } from './report-create-without-user.input';

@InputType()
export class ReportUpsertWithWhereUniqueWithoutUserInput {

    @Field(() => ReportWhereUniqueInput, {nullable:false})
    @Type(() => ReportWhereUniqueInput)
    where!: Prisma.AtLeast<ReportWhereUniqueInput, 'report_id'>;

    @Field(() => ReportUpdateWithoutUserInput, {nullable:false})
    @Type(() => ReportUpdateWithoutUserInput)
    update!: ReportUpdateWithoutUserInput;

    @Field(() => ReportCreateWithoutUserInput, {nullable:false})
    @Type(() => ReportCreateWithoutUserInput)
    create!: ReportCreateWithoutUserInput;
}
