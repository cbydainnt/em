import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseViewCreateManyCourseInput } from './course-view-create-many-course.input';
import { Type } from 'class-transformer';

@InputType()
export class CourseViewCreateManyCourseInputEnvelope {

    @Field(() => [CourseViewCreateManyCourseInput], {nullable:false})
    @Type(() => CourseViewCreateManyCourseInput)
    data!: Array<CourseViewCreateManyCourseInput>;
}
