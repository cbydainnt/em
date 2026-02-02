import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ReportCommentWhereUniqueInput } from './report-comment-where-unique.input';
import { Type } from 'class-transformer';
import { ReportCommentUpdateWithoutUserInput } from './report-comment-update-without-user.input';

@InputType()
export class ReportCommentUpdateWithWhereUniqueWithoutUserInput {

    @Field(() => ReportCommentWhereUniqueInput, {nullable:false})
    @Type(() => ReportCommentWhereUniqueInput)
    where!: Prisma.AtLeast<ReportCommentWhereUniqueInput, 'comment_id'>;

    @Field(() => ReportCommentUpdateWithoutUserInput, {nullable:false})
    @Type(() => ReportCommentUpdateWithoutUserInput)
    data!: ReportCommentUpdateWithoutUserInput;
}
