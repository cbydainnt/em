import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';
import { Type } from 'class-transformer';
import { LessonCreateWithoutNotesInput } from './lesson-create-without-notes.input';

@InputType()
export class LessonCreateOrConnectWithoutNotesInput {

    @Field(() => LessonWhereUniqueInput, {nullable:false})
    @Type(() => LessonWhereUniqueInput)
    where!: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;

    @Field(() => LessonCreateWithoutNotesInput, {nullable:false})
    @Type(() => LessonCreateWithoutNotesInput)
    create!: LessonCreateWithoutNotesInput;
}
