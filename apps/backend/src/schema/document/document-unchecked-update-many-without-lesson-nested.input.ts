import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DocumentCreateWithoutLessonInput } from './document-create-without-lesson.input';
import { Type } from 'class-transformer';
import { DocumentCreateOrConnectWithoutLessonInput } from './document-create-or-connect-without-lesson.input';
import { DocumentUpsertWithWhereUniqueWithoutLessonInput } from './document-upsert-with-where-unique-without-lesson.input';
import { DocumentCreateManyLessonInputEnvelope } from './document-create-many-lesson-input-envelope.input';
import { Prisma } from '@prisma/client';
import { DocumentWhereUniqueInput } from './document-where-unique.input';
import { DocumentUpdateWithWhereUniqueWithoutLessonInput } from './document-update-with-where-unique-without-lesson.input';
import { DocumentUpdateManyWithWhereWithoutLessonInput } from './document-update-many-with-where-without-lesson.input';
import { DocumentScalarWhereInput } from './document-scalar-where.input';

@InputType()
export class DocumentUncheckedUpdateManyWithoutLessonNestedInput {

    @Field(() => [DocumentCreateWithoutLessonInput], {nullable:true})
    @Type(() => DocumentCreateWithoutLessonInput)
    create?: Array<DocumentCreateWithoutLessonInput>;

    @Field(() => [DocumentCreateOrConnectWithoutLessonInput], {nullable:true})
    @Type(() => DocumentCreateOrConnectWithoutLessonInput)
    connectOrCreate?: Array<DocumentCreateOrConnectWithoutLessonInput>;

    @Field(() => [DocumentUpsertWithWhereUniqueWithoutLessonInput], {nullable:true})
    @Type(() => DocumentUpsertWithWhereUniqueWithoutLessonInput)
    upsert?: Array<DocumentUpsertWithWhereUniqueWithoutLessonInput>;

    @Field(() => DocumentCreateManyLessonInputEnvelope, {nullable:true})
    @Type(() => DocumentCreateManyLessonInputEnvelope)
    createMany?: DocumentCreateManyLessonInputEnvelope;

    @Field(() => [DocumentWhereUniqueInput], {nullable:true})
    @Type(() => DocumentWhereUniqueInput)
    set?: Array<Prisma.AtLeast<DocumentWhereUniqueInput, 'document_id'>>;

    @Field(() => [DocumentWhereUniqueInput], {nullable:true})
    @Type(() => DocumentWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<DocumentWhereUniqueInput, 'document_id'>>;

    @Field(() => [DocumentWhereUniqueInput], {nullable:true})
    @Type(() => DocumentWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<DocumentWhereUniqueInput, 'document_id'>>;

    @Field(() => [DocumentWhereUniqueInput], {nullable:true})
    @Type(() => DocumentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DocumentWhereUniqueInput, 'document_id'>>;

    @Field(() => [DocumentUpdateWithWhereUniqueWithoutLessonInput], {nullable:true})
    @Type(() => DocumentUpdateWithWhereUniqueWithoutLessonInput)
    update?: Array<DocumentUpdateWithWhereUniqueWithoutLessonInput>;

    @Field(() => [DocumentUpdateManyWithWhereWithoutLessonInput], {nullable:true})
    @Type(() => DocumentUpdateManyWithWhereWithoutLessonInput)
    updateMany?: Array<DocumentUpdateManyWithWhereWithoutLessonInput>;

    @Field(() => [DocumentScalarWhereInput], {nullable:true})
    @Type(() => DocumentScalarWhereInput)
    deleteMany?: Array<DocumentScalarWhereInput>;
}
