import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CourseViewWhereUniqueInput } from './course-view-where-unique.input';
import { Type } from 'class-transformer';
import { CourseViewCreateWithoutUserInput } from './course-view-create-without-user.input';

@InputType()
export class CourseViewCreateOrConnectWithoutUserInput {

    @Field(() => CourseViewWhereUniqueInput, {nullable:false})
    @Type(() => CourseViewWhereUniqueInput)
    where!: Prisma.AtLeast<CourseViewWhereUniqueInput, 'id'>;

    @Field(() => CourseViewCreateWithoutUserInput, {nullable:false})
    @Type(() => CourseViewCreateWithoutUserInput)
    create!: CourseViewCreateWithoutUserInput;
}
