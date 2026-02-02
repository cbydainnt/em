import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ReportWhereUniqueInput } from './report-where-unique.input';
import { Type } from 'class-transformer';
import { ReportCreateWithoutCommentsInput } from './report-create-without-comments.input';

@InputType()
export class ReportCreateOrConnectWithoutCommentsInput {

    @Field(() => ReportWhereUniqueInput, {nullable:false})
    @Type(() => ReportWhereUniqueInput)
    where!: Prisma.AtLeast<ReportWhereUniqueInput, 'report_id'>;

    @Field(() => ReportCreateWithoutCommentsInput, {nullable:false})
    @Type(() => ReportCreateWithoutCommentsInput)
    create!: ReportCreateWithoutCommentsInput;
}
