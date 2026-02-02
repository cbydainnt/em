import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CourseViewWhereUniqueInput } from './course-view-where-unique.input';
import { Type } from 'class-transformer';
import { CourseViewCreateInput } from './course-view-create.input';
import { CourseViewUpdateInput } from './course-view-update.input';

@ArgsType()
export class UpsertOneCourseViewArgs {

    @Field(() => CourseViewWhereUniqueInput, {nullable:false})
    @Type(() => CourseViewWhereUniqueInput)
    where!: Prisma.AtLeast<CourseViewWhereUniqueInput, 'id'>;

    @Field(() => CourseViewCreateInput, {nullable:false})
    @Type(() => CourseViewCreateInput)
    create!: CourseViewCreateInput;

    @Field(() => CourseViewUpdateInput, {nullable:false})
    @Type(() => CourseViewUpdateInput)
    update!: CourseViewUpdateInput;
}
