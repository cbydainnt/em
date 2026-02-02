import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SectionCreateManyCourseInput } from './section-create-many-course.input';
import { Type } from 'class-transformer';

@InputType()
export class SectionCreateManyCourseInputEnvelope {

    @Field(() => [SectionCreateManyCourseInput], {nullable:false})
    @Type(() => SectionCreateManyCourseInput)
    data!: Array<SectionCreateManyCourseInput>;
}
