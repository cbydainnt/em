import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReportCreateManyCourseInput } from './report-create-many-course.input';
import { Type } from 'class-transformer';

@InputType()
export class ReportCreateManyCourseInputEnvelope {

    @Field(() => [ReportCreateManyCourseInput], {nullable:false})
    @Type(() => ReportCreateManyCourseInput)
    data!: Array<ReportCreateManyCourseInput>;
}
