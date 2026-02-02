import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';
import { Type } from 'class-transformer';
import { LessonUpdateWithoutSectionInput } from './lesson-update-without-section.input';

@InputType()
export class LessonUpdateWithWhereUniqueWithoutSectionInput {

    @Field(() => LessonWhereUniqueInput, {nullable:false})
    @Type(() => LessonWhereUniqueInput)
    where!: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;

    @Field(() => LessonUpdateWithoutSectionInput, {nullable:false})
    @Type(() => LessonUpdateWithoutSectionInput)
    data!: LessonUpdateWithoutSectionInput;
}
