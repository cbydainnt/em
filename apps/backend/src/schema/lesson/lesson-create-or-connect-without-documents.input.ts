import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';
import { Type } from 'class-transformer';
import { LessonCreateWithoutDocumentsInput } from './lesson-create-without-documents.input';

@InputType()
export class LessonCreateOrConnectWithoutDocumentsInput {

    @Field(() => LessonWhereUniqueInput, {nullable:false})
    @Type(() => LessonWhereUniqueInput)
    where!: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;

    @Field(() => LessonCreateWithoutDocumentsInput, {nullable:false})
    @Type(() => LessonCreateWithoutDocumentsInput)
    create!: LessonCreateWithoutDocumentsInput;
}
