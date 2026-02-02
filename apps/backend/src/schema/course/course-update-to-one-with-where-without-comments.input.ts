import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseWhereInput } from './course-where.input';
import { Type } from 'class-transformer';
import { CourseUpdateWithoutCommentsInput } from './course-update-without-comments.input';

@InputType()
export class CourseUpdateToOneWithWhereWithoutCommentsInput {

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    where?: CourseWhereInput;

    @Field(() => CourseUpdateWithoutCommentsInput, {nullable:false})
    @Type(() => CourseUpdateWithoutCommentsInput)
    data!: CourseUpdateWithoutCommentsInput;
}
