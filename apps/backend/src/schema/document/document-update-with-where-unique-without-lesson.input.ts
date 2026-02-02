import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DocumentWhereUniqueInput } from './document-where-unique.input';
import { Type } from 'class-transformer';
import { DocumentUpdateWithoutLessonInput } from './document-update-without-lesson.input';

@InputType()
export class DocumentUpdateWithWhereUniqueWithoutLessonInput {

    @Field(() => DocumentWhereUniqueInput, {nullable:false})
    @Type(() => DocumentWhereUniqueInput)
    where!: Prisma.AtLeast<DocumentWhereUniqueInput, 'document_id'>;

    @Field(() => DocumentUpdateWithoutLessonInput, {nullable:false})
    @Type(() => DocumentUpdateWithoutLessonInput)
    data!: DocumentUpdateWithoutLessonInput;
}
