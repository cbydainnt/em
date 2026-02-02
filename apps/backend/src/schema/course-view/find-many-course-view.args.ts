import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CourseViewWhereInput } from './course-view-where.input';
import { Type } from 'class-transformer';
import { CourseViewOrderByWithRelationInput } from './course-view-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { CourseViewWhereUniqueInput } from './course-view-where-unique.input';
import { Int } from '@nestjs/graphql';
import { CourseViewScalarFieldEnum } from './course-view-scalar-field.enum';

@ArgsType()
export class FindManyCourseViewArgs {

    @Field(() => CourseViewWhereInput, {nullable:true})
    @Type(() => CourseViewWhereInput)
    where?: CourseViewWhereInput;

    @Field(() => [CourseViewOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<CourseViewOrderByWithRelationInput>;

    @Field(() => CourseViewWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<CourseViewWhereUniqueInput, 'id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [CourseViewScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof CourseViewScalarFieldEnum>;
}
