import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReportUpdateWithoutCommentsInput } from './report-update-without-comments.input';
import { Type } from 'class-transformer';
import { ReportCreateWithoutCommentsInput } from './report-create-without-comments.input';
import { ReportWhereInput } from './report-where.input';

@InputType()
export class ReportUpsertWithoutCommentsInput {

    @Field(() => ReportUpdateWithoutCommentsInput, {nullable:false})
    @Type(() => ReportUpdateWithoutCommentsInput)
    update!: ReportUpdateWithoutCommentsInput;

    @Field(() => ReportCreateWithoutCommentsInput, {nullable:false})
    @Type(() => ReportCreateWithoutCommentsInput)
    create!: ReportCreateWithoutCommentsInput;

    @Field(() => ReportWhereInput, {nullable:true})
    @Type(() => ReportWhereInput)
    where?: ReportWhereInput;
}
