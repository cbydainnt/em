import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';
import { Type } from 'class-transformer';
import { CourseCreateWithoutCommentsInput } from './course-create-without-comments.input';

@InputType()
export class CourseCreateOrConnectWithoutCommentsInput {

    @Field(() => CourseWhereUniqueInput, {nullable:false})
    @Type(() => CourseWhereUniqueInput)
    where!: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;

    @Field(() => CourseCreateWithoutCommentsInput, {nullable:false})
    @Type(() => CourseCreateWithoutCommentsInput)
    create!: CourseCreateWithoutCommentsInput;
}
