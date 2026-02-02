import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReportCreateManyLessonInput } from './report-create-many-lesson.input';
import { Type } from 'class-transformer';

@InputType()
export class ReportCreateManyLessonInputEnvelope {

    @Field(() => [ReportCreateManyLessonInput], {nullable:false})
    @Type(() => ReportCreateManyLessonInput)
    data!: Array<ReportCreateManyLessonInput>;
}
