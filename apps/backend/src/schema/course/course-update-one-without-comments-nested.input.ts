import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateWithoutCommentsInput } from './course-create-without-comments.input';
import { Type } from 'class-transformer';
import { CourseCreateOrConnectWithoutCommentsInput } from './course-create-or-connect-without-comments.input';
import { CourseUpsertWithoutCommentsInput } from './course-upsert-without-comments.input';
import { CourseWhereInput } from './course-where.input';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';
import { CourseUpdateToOneWithWhereWithoutCommentsInput } from './course-update-to-one-with-where-without-comments.input';

@InputType()
export class CourseUpdateOneWithoutCommentsNestedInput {

    @Field(() => CourseCreateWithoutCommentsInput, {nullable:true})
    @Type(() => CourseCreateWithoutCommentsInput)
    create?: CourseCreateWithoutCommentsInput;

    @Field(() => CourseCreateOrConnectWithoutCommentsInput, {nullable:true})
    @Type(() => CourseCreateOrConnectWithoutCommentsInput)
    connectOrCreate?: CourseCreateOrConnectWithoutCommentsInput;

    @Field(() => CourseUpsertWithoutCommentsInput, {nullable:true})
    @Type(() => CourseUpsertWithoutCommentsInput)
    upsert?: CourseUpsertWithoutCommentsInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    delete?: CourseWhereInput;

    @Field(() => CourseWhereUniqueInput, {nullable:true})
    @Type(() => CourseWhereUniqueInput)
    connect?: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;

    @Field(() => CourseUpdateToOneWithWhereWithoutCommentsInput, {nullable:true})
    @Type(() => CourseUpdateToOneWithWhereWithoutCommentsInput)
    update?: CourseUpdateToOneWithWhereWithoutCommentsInput;
}
