import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseUpdateWithoutCommentsInput } from './course-update-without-comments.input';
import { Type } from 'class-transformer';
import { CourseCreateWithoutCommentsInput } from './course-create-without-comments.input';
import { CourseWhereInput } from './course-where.input';

@InputType()
export class CourseUpsertWithoutCommentsInput {

    @Field(() => CourseUpdateWithoutCommentsInput, {nullable:false})
    @Type(() => CourseUpdateWithoutCommentsInput)
    update!: CourseUpdateWithoutCommentsInput;

    @Field(() => CourseCreateWithoutCommentsInput, {nullable:false})
    @Type(() => CourseCreateWithoutCommentsInput)
    create!: CourseCreateWithoutCommentsInput;

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    where?: CourseWhereInput;
}
