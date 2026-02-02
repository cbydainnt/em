import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CourseViewCreateInput } from './course-view-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneCourseViewArgs {

    @Field(() => CourseViewCreateInput, {nullable:false})
    @Type(() => CourseViewCreateInput)
    data!: CourseViewCreateInput;
}
