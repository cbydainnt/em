import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseViewCreateManyUserInput } from './course-view-create-many-user.input';
import { Type } from 'class-transformer';

@InputType()
export class CourseViewCreateManyUserInputEnvelope {

    @Field(() => [CourseViewCreateManyUserInput], {nullable:false})
    @Type(() => CourseViewCreateManyUserInput)
    data!: Array<CourseViewCreateManyUserInput>;
}
