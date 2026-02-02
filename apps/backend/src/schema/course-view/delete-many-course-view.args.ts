import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CourseViewWhereInput } from './course-view-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyCourseViewArgs {

    @Field(() => CourseViewWhereInput, {nullable:true})
    @Type(() => CourseViewWhereInput)
    where?: CourseViewWhereInput;
}
