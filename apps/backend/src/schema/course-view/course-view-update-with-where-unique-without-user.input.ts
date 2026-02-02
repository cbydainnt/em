import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CourseViewWhereUniqueInput } from './course-view-where-unique.input';
import { Type } from 'class-transformer';
import { CourseViewUpdateWithoutUserInput } from './course-view-update-without-user.input';

@InputType()
export class CourseViewUpdateWithWhereUniqueWithoutUserInput {

    @Field(() => CourseViewWhereUniqueInput, {nullable:false})
    @Type(() => CourseViewWhereUniqueInput)
    where!: Prisma.AtLeast<CourseViewWhereUniqueInput, 'id'>;

    @Field(() => CourseViewUpdateWithoutUserInput, {nullable:false})
    @Type(() => CourseViewUpdateWithoutUserInput)
    data!: CourseViewUpdateWithoutUserInput;
}
