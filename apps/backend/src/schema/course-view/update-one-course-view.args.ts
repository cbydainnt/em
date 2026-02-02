import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CourseViewUpdateInput } from './course-view-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { CourseViewWhereUniqueInput } from './course-view-where-unique.input';

@ArgsType()
export class UpdateOneCourseViewArgs {

    @Field(() => CourseViewUpdateInput, {nullable:false})
    @Type(() => CourseViewUpdateInput)
    data!: CourseViewUpdateInput;

    @Field(() => CourseViewWhereUniqueInput, {nullable:false})
    @Type(() => CourseViewWhereUniqueInput)
    where!: Prisma.AtLeast<CourseViewWhereUniqueInput, 'id'>;
}
