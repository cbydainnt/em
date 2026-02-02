import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateWithoutCombosInput } from './course-create-without-combos.input';
import { Type } from 'class-transformer';
import { CourseCreateOrConnectWithoutCombosInput } from './course-create-or-connect-without-combos.input';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';

@InputType()
export class CourseCreateNestedOneWithoutCombosInput {

    @Field(() => CourseCreateWithoutCombosInput, {nullable:true})
    @Type(() => CourseCreateWithoutCombosInput)
    create?: CourseCreateWithoutCombosInput;

    @Field(() => CourseCreateOrConnectWithoutCombosInput, {nullable:true})
    @Type(() => CourseCreateOrConnectWithoutCombosInput)
    connectOrCreate?: CourseCreateOrConnectWithoutCombosInput;

    @Field(() => CourseWhereUniqueInput, {nullable:true})
    @Type(() => CourseWhereUniqueInput)
    connect?: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;
}
