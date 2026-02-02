import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReportCreateManyUserInput } from './report-create-many-user.input';
import { Type } from 'class-transformer';

@InputType()
export class ReportCreateManyUserInputEnvelope {

    @Field(() => [ReportCreateManyUserInput], {nullable:false})
    @Type(() => ReportCreateManyUserInput)
    data!: Array<ReportCreateManyUserInput>;
}
