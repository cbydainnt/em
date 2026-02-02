import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateWithoutCombosInput } from './course-create-without-combos.input';
import { Type } from 'class-transformer';
import { CourseCreateOrConnectWithoutCombosInput } from './course-create-or-connect-without-combos.input';
import { CourseUpsertWithoutCombosInput } from './course-upsert-without-combos.input';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';
import { CourseUpdateToOneWithWhereWithoutCombosInput } from './course-update-to-one-with-where-without-combos.input';

@InputType()
export class CourseUpdateOneRequiredWithoutCombosNestedInput {

    @Field(() => CourseCreateWithoutCombosInput, {nullable:true})
    @Type(() => CourseCreateWithoutCombosInput)
    create?: CourseCreateWithoutCombosInput;

    @Field(() => CourseCreateOrConnectWithoutCombosInput, {nullable:true})
    @Type(() => CourseCreateOrConnectWithoutCombosInput)
    connectOrCreate?: CourseCreateOrConnectWithoutCombosInput;

    @Field(() => CourseUpsertWithoutCombosInput, {nullable:true})
    @Type(() => CourseUpsertWithoutCombosInput)
    upsert?: CourseUpsertWithoutCombosInput;

    @Field(() => CourseWhereUniqueInput, {nullable:true})
    @Type(() => CourseWhereUniqueInput)
    connect?: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;

    @Field(() => CourseUpdateToOneWithWhereWithoutCombosInput, {nullable:true})
    @Type(() => CourseUpdateToOneWithWhereWithoutCombosInput)
    update?: CourseUpdateToOneWithWhereWithoutCombosInput;
}
