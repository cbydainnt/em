import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReportCommentCreateWithoutUserInput } from './report-comment-create-without-user.input';
import { Type } from 'class-transformer';
import { ReportCommentCreateOrConnectWithoutUserInput } from './report-comment-create-or-connect-without-user.input';
import { ReportCommentUpsertWithWhereUniqueWithoutUserInput } from './report-comment-upsert-with-where-unique-without-user.input';
import { ReportCommentCreateManyUserInputEnvelope } from './report-comment-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ReportCommentWhereUniqueInput } from './report-comment-where-unique.input';
import { ReportCommentUpdateWithWhereUniqueWithoutUserInput } from './report-comment-update-with-where-unique-without-user.input';
import { ReportCommentUpdateManyWithWhereWithoutUserInput } from './report-comment-update-many-with-where-without-user.input';
import { ReportCommentScalarWhereInput } from './report-comment-scalar-where.input';

@InputType()
export class ReportCommentUncheckedUpdateManyWithoutUserNestedInput {

    @Field(() => [ReportCommentCreateWithoutUserInput], {nullable:true})
    @Type(() => ReportCommentCreateWithoutUserInput)
    create?: Array<ReportCommentCreateWithoutUserInput>;

    @Field(() => [ReportCommentCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => ReportCommentCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<ReportCommentCreateOrConnectWithoutUserInput>;

    @Field(() => [ReportCommentUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => ReportCommentUpsertWithWhereUniqueWithoutUserInput)
    upsert?: Array<ReportCommentUpsertWithWhereUniqueWithoutUserInput>;

    @Field(() => ReportCommentCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => ReportCommentCreateManyUserInputEnvelope)
    createMany?: ReportCommentCreateManyUserInputEnvelope;

    @Field(() => [ReportCommentWhereUniqueInput], {nullable:true})
    @Type(() => ReportCommentWhereUniqueInput)
    set?: Array<Prisma.AtLeast<ReportCommentWhereUniqueInput, 'comment_id'>>;

    @Field(() => [ReportCommentWhereUniqueInput], {nullable:true})
    @Type(() => ReportCommentWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<ReportCommentWhereUniqueInput, 'comment_id'>>;

    @Field(() => [ReportCommentWhereUniqueInput], {nullable:true})
    @Type(() => ReportCommentWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<ReportCommentWhereUniqueInput, 'comment_id'>>;

    @Field(() => [ReportCommentWhereUniqueInput], {nullable:true})
    @Type(() => ReportCommentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ReportCommentWhereUniqueInput, 'comment_id'>>;

    @Field(() => [ReportCommentUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => ReportCommentUpdateWithWhereUniqueWithoutUserInput)
    update?: Array<ReportCommentUpdateWithWhereUniqueWithoutUserInput>;

    @Field(() => [ReportCommentUpdateManyWithWhereWithoutUserInput], {nullable:true})
    @Type(() => ReportCommentUpdateManyWithWhereWithoutUserInput)
    updateMany?: Array<ReportCommentUpdateManyWithWhereWithoutUserInput>;

    @Field(() => [ReportCommentScalarWhereInput], {nullable:true})
    @Type(() => ReportCommentScalarWhereInput)
    deleteMany?: Array<ReportCommentScalarWhereInput>;
}
