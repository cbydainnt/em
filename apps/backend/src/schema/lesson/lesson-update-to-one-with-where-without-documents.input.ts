import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonWhereInput } from './lesson-where.input';
import { Type } from 'class-transformer';
import { LessonUpdateWithoutDocumentsInput } from './lesson-update-without-documents.input';

@InputType()
export class LessonUpdateToOneWithWhereWithoutDocumentsInput {

    @Field(() => LessonWhereInput, {nullable:true})
    @Type(() => LessonWhereInput)
    where?: LessonWhereInput;

    @Field(() => LessonUpdateWithoutDocumentsInput, {nullable:false})
    @Type(() => LessonUpdateWithoutDocumentsInput)
    data!: LessonUpdateWithoutDocumentsInput;
}
