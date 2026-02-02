import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReportCommentScalarWhereInput } from './report-comment-scalar-where.input';
import { Type } from 'class-transformer';
import { ReportCommentUpdateManyMutationInput } from './report-comment-update-many-mutation.input';

@InputType()
export class ReportCommentUpdateManyWithWhereWithoutReportInput {

    @Field(() => ReportCommentScalarWhereInput, {nullable:false})
    @Type(() => ReportCommentScalarWhereInput)
    where!: ReportCommentScalarWhereInput;

    @Field(() => ReportCommentUpdateManyMutationInput, {nullable:false})
    @Type(() => ReportCommentUpdateManyMutationInput)
    data!: ReportCommentUpdateManyMutationInput;
}
