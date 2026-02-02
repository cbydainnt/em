import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DocumentCreateWithoutLessonInput } from './document-create-without-lesson.input';
import { Type } from 'class-transformer';
import { DocumentCreateOrConnectWithoutLessonInput } from './document-create-or-connect-without-lesson.input';
import { DocumentCreateManyLessonInputEnvelope } from './document-create-many-lesson-input-envelope.input';
import { Prisma } from '@prisma/client';
import { DocumentWhereUniqueInput } from './document-where-unique.input';

@InputType()
export class DocumentUncheckedCreateNestedManyWithoutLessonInput {

    @Field(() => [DocumentCreateWithoutLessonInput], {nullable:true})
    @Type(() => DocumentCreateWithoutLessonInput)
    create?: Array<DocumentCreateWithoutLessonInput>;

    @Field(() => [DocumentCreateOrConnectWithoutLessonInput], {nullable:true})
    @Type(() => DocumentCreateOrConnectWithoutLessonInput)
    connectOrCreate?: Array<DocumentCreateOrConnectWithoutLessonInput>;

    @Field(() => DocumentCreateManyLessonInputEnvelope, {nullable:true})
    @Type(() => DocumentCreateManyLessonInputEnvelope)
    createMany?: DocumentCreateManyLessonInputEnvelope;

    @Field(() => [DocumentWhereUniqueInput], {nullable:true})
    @Type(() => DocumentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DocumentWhereUniqueInput, 'document_id'>>;
}
