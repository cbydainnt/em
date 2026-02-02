import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateWithoutCommentsInput } from './course-create-without-comments.input';
import { Type } from 'class-transformer';
import { CourseCreateOrConnectWithoutCommentsInput } from './course-create-or-connect-without-comments.input';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';

@InputType()
export class CourseCreateNestedOneWithoutCommentsInput {

    @Field(() => CourseCreateWithoutCommentsInput, {nullable:true})
    @Type(() => CourseCreateWithoutCommentsInput)
    create?: CourseCreateWithoutCommentsInput;

    @Field(() => CourseCreateOrConnectWithoutCommentsInput, {nullable:true})
    @Type(() => CourseCreateOrConnectWithoutCommentsInput)
    connectOrCreate?: CourseCreateOrConnectWithoutCommentsInput;

    @Field(() => CourseWhereUniqueInput, {nullable:true})
    @Type(() => CourseWhereUniqueInput)
    connect?: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;
}
