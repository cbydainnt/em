import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReportCommentCreateManyUserInput } from './report-comment-create-many-user.input';
import { Type } from 'class-transformer';

@InputType()
export class ReportCommentCreateManyUserInputEnvelope {

    @Field(() => [ReportCommentCreateManyUserInput], {nullable:false})
    @Type(() => ReportCommentCreateManyUserInput)
    data!: Array<ReportCommentCreateManyUserInput>;
}
