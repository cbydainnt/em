import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonUpdateWithoutDocumentsInput } from './lesson-update-without-documents.input';
import { Type } from 'class-transformer';
import { LessonCreateWithoutDocumentsInput } from './lesson-create-without-documents.input';
import { LessonWhereInput } from './lesson-where.input';

@InputType()
export class LessonUpsertWithoutDocumentsInput {

    @Field(() => LessonUpdateWithoutDocumentsInput, {nullable:false})
    @Type(() => LessonUpdateWithoutDocumentsInput)
    update!: LessonUpdateWithoutDocumentsInput;

    @Field(() => LessonCreateWithoutDocumentsInput, {nullable:false})
    @Type(() => LessonCreateWithoutDocumentsInput)
    create!: LessonCreateWithoutDocumentsInput;

    @Field(() => LessonWhereInput, {nullable:true})
    @Type(() => LessonWhereInput)
    where?: LessonWhereInput;
}
