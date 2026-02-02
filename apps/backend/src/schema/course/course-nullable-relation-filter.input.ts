import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseWhereInput } from './course-where.input';

@InputType()
export class CourseNullableRelationFilter {

    @Field(() => CourseWhereInput, {nullable:true})
    is?: CourseWhereInput;

    @Field(() => CourseWhereInput, {nullable:true})
    isNot?: CourseWhereInput;
}
