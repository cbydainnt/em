import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { SectionWhereUniqueInput } from './section-where-unique.input';
import { Type } from 'class-transformer';
import { SectionUpdateWithoutCourseInput } from './section-update-without-course.input';
import { SectionCreateWithoutCourseInput } from './section-create-without-course.input';

@InputType()
export class SectionUpsertWithWhereUniqueWithoutCourseInput {

    @Field(() => SectionWhereUniqueInput, {nullable:false})
    @Type(() => SectionWhereUniqueInput)
    where!: Prisma.AtLeast<SectionWhereUniqueInput, 'section_id'>;

    @Field(() => SectionUpdateWithoutCourseInput, {nullable:false})
    @Type(() => SectionUpdateWithoutCourseInput)
    update!: SectionUpdateWithoutCourseInput;

    @Field(() => SectionCreateWithoutCourseInput, {nullable:false})
    @Type(() => SectionCreateWithoutCourseInput)
    create!: SectionCreateWithoutCourseInput;
}
