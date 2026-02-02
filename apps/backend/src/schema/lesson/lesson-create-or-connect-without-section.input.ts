import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';
import { Type } from 'class-transformer';
import { LessonCreateWithoutSectionInput } from './lesson-create-without-section.input';

@InputType()
export class LessonCreateOrConnectWithoutSectionInput {

    @Field(() => LessonWhereUniqueInput, {nullable:false})
    @Type(() => LessonWhereUniqueInput)
    where!: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;

    @Field(() => LessonCreateWithoutSectionInput, {nullable:false})
    @Type(() => LessonCreateWithoutSectionInput)
    create!: LessonCreateWithoutSectionInput;
}
