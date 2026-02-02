import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReportCreateWithoutCommentsInput } from './report-create-without-comments.input';
import { Type } from 'class-transformer';
import { ReportCreateOrConnectWithoutCommentsInput } from './report-create-or-connect-without-comments.input';
import { ReportUpsertWithoutCommentsInput } from './report-upsert-without-comments.input';
import { Prisma } from '@prisma/client';
import { ReportWhereUniqueInput } from './report-where-unique.input';
import { ReportUpdateToOneWithWhereWithoutCommentsInput } from './report-update-to-one-with-where-without-comments.input';

@InputType()
export class ReportUpdateOneRequiredWithoutCommentsNestedInput {

    @Field(() => ReportCreateWithoutCommentsInput, {nullable:true})
    @Type(() => ReportCreateWithoutCommentsInput)
    create?: ReportCreateWithoutCommentsInput;

    @Field(() => ReportCreateOrConnectWithoutCommentsInput, {nullable:true})
    @Type(() => ReportCreateOrConnectWithoutCommentsInput)
    connectOrCreate?: ReportCreateOrConnectWithoutCommentsInput;

    @Field(() => ReportUpsertWithoutCommentsInput, {nullable:true})
    @Type(() => ReportUpsertWithoutCommentsInput)
    upsert?: ReportUpsertWithoutCommentsInput;

    @Field(() => ReportWhereUniqueInput, {nullable:true})
    @Type(() => ReportWhereUniqueInput)
    connect?: Prisma.AtLeast<ReportWhereUniqueInput, 'report_id'>;

    @Field(() => ReportUpdateToOneWithWhereWithoutCommentsInput, {nullable:true})
    @Type(() => ReportUpdateToOneWithWhereWithoutCommentsInput)
    update?: ReportUpdateToOneWithWhereWithoutCommentsInput;
}
