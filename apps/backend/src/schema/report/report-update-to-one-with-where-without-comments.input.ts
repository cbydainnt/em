import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReportWhereInput } from './report-where.input';
import { Type } from 'class-transformer';
import { ReportUpdateWithoutCommentsInput } from './report-update-without-comments.input';

@InputType()
export class ReportUpdateToOneWithWhereWithoutCommentsInput {

    @Field(() => ReportWhereInput, {nullable:true})
    @Type(() => ReportWhereInput)
    where?: ReportWhereInput;

    @Field(() => ReportUpdateWithoutCommentsInput, {nullable:false})
    @Type(() => ReportUpdateWithoutCommentsInput)
    data!: ReportUpdateWithoutCommentsInput;
}
