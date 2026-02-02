import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CourseViewCreateManyInput } from './course-view-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyCourseViewArgs {

    @Field(() => [CourseViewCreateManyInput], {nullable:false})
    @Type(() => CourseViewCreateManyInput)
    data!: Array<CourseViewCreateManyInput>;
}
