import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReportCreateWithoutCommentsInput } from './report-create-without-comments.input';
import { Type } from 'class-transformer';
import { ReportCreateOrConnectWithoutCommentsInput } from './report-create-or-connect-without-comments.input';
import { Prisma } from '@prisma/client';
import { ReportWhereUniqueInput } from './report-where-unique.input';

@InputType()
export class ReportCreateNestedOneWithoutCommentsInput {

    @Field(() => ReportCreateWithoutCommentsInput, {nullable:true})
    @Type(() => ReportCreateWithoutCommentsInput)
    create?: ReportCreateWithoutCommentsInput;

    @Field(() => ReportCreateOrConnectWithoutCommentsInput, {nullable:true})
    @Type(() => ReportCreateOrConnectWithoutCommentsInput)
    connectOrCreate?: ReportCreateOrConnectWithoutCommentsInput;

    @Field(() => ReportWhereUniqueInput, {nullable:true})
    @Type(() => ReportWhereUniqueInput)
    connect?: Prisma.AtLeast<ReportWhereUniqueInput, 'report_id'>;
}
