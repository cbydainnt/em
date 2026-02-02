import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ReportWhereUniqueInput } from './report-where-unique.input';
import { Type } from 'class-transformer';
import { ReportCreateWithoutUserInput } from './report-create-without-user.input';

@InputType()
export class ReportCreateOrConnectWithoutUserInput {

    @Field(() => ReportWhereUniqueInput, {nullable:false})
    @Type(() => ReportWhereUniqueInput)
    where!: Prisma.AtLeast<ReportWhereUniqueInput, 'report_id'>;

    @Field(() => ReportCreateWithoutUserInput, {nullable:false})
    @Type(() => ReportCreateWithoutUserInput)
    create!: ReportCreateWithoutUserInput;
}
