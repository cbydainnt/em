import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CourseViewWhereUniqueInput } from './course-view-where-unique.input';
import { Type } from 'class-transformer';
import { CourseViewUpdateWithoutUserInput } from './course-view-update-without-user.input';
import { CourseViewCreateWithoutUserInput } from './course-view-create-without-user.input';

@InputType()
export class CourseViewUpsertWithWhereUniqueWithoutUserInput {

    @Field(() => CourseViewWhereUniqueInput, {nullable:false})
    @Type(() => CourseViewWhereUniqueInput)
    where!: Prisma.AtLeast<CourseViewWhereUniqueInput, 'id'>;

    @Field(() => CourseViewUpdateWithoutUserInput, {nullable:false})
    @Type(() => CourseViewUpdateWithoutUserInput)
    update!: CourseViewUpdateWithoutUserInput;

    @Field(() => CourseViewCreateWithoutUserInput, {nullable:false})
    @Type(() => CourseViewCreateWithoutUserInput)
    create!: CourseViewCreateWithoutUserInput;
}
