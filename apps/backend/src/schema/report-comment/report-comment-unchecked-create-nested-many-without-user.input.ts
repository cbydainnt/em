import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReportCommentCreateWithoutUserInput } from './report-comment-create-without-user.input';
import { Type } from 'class-transformer';
import { ReportCommentCreateOrConnectWithoutUserInput } from './report-comment-create-or-connect-without-user.input';
import { ReportCommentCreateManyUserInputEnvelope } from './report-comment-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ReportCommentWhereUniqueInput } from './report-comment-where-unique.input';

@InputType()
export class ReportCommentUncheckedCreateNestedManyWithoutUserInput {

    @Field(() => [ReportCommentCreateWithoutUserInput], {nullable:true})
    @Type(() => ReportCommentCreateWithoutUserInput)
    create?: Array<ReportCommentCreateWithoutUserInput>;

    @Field(() => [ReportCommentCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => ReportCommentCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<ReportCommentCreateOrConnectWithoutUserInput>;

    @Field(() => ReportCommentCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => ReportCommentCreateManyUserInputEnvelope)
    createMany?: ReportCommentCreateManyUserInputEnvelope;

    @Field(() => [ReportCommentWhereUniqueInput], {nullable:true})
    @Type(() => ReportCommentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ReportCommentWhereUniqueInput, 'comment_id'>>;
}
