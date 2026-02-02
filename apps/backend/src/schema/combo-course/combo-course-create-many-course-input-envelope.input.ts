import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ComboCourseCreateManyCourseInput } from './combo-course-create-many-course.input';
import { Type } from 'class-transformer';

@InputType()
export class ComboCourseCreateManyCourseInputEnvelope {

    @Field(() => [ComboCourseCreateManyCourseInput], {nullable:false})
    @Type(() => ComboCourseCreateManyCourseInput)
    data!: Array<ComboCourseCreateManyCourseInput>;
}
