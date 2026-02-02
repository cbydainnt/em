import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReportWhereInput } from './report-where.input';

@InputType()
export class ReportRelationFilter {

    @Field(() => ReportWhereInput, {nullable:true})
    is?: ReportWhereInput;

    @Field(() => ReportWhereInput, {nullable:true})
    isNot?: ReportWhereInput;
}
