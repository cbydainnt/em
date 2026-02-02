import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonCreateWithoutDocumentsInput } from './lesson-create-without-documents.input';
import { Type } from 'class-transformer';
import { LessonCreateOrConnectWithoutDocumentsInput } from './lesson-create-or-connect-without-documents.input';
import { LessonUpsertWithoutDocumentsInput } from './lesson-upsert-without-documents.input';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';
import { LessonUpdateToOneWithWhereWithoutDocumentsInput } from './lesson-update-to-one-with-where-without-documents.input';

@InputType()
export class LessonUpdateOneRequiredWithoutDocumentsNestedInput {

    @Field(() => LessonCreateWithoutDocumentsInput, {nullable:true})
    @Type(() => LessonCreateWithoutDocumentsInput)
    create?: LessonCreateWithoutDocumentsInput;

    @Field(() => LessonCreateOrConnectWithoutDocumentsInput, {nullable:true})
    @Type(() => LessonCreateOrConnectWithoutDocumentsInput)
    connectOrCreate?: LessonCreateOrConnectWithoutDocumentsInput;

    @Field(() => LessonUpsertWithoutDocumentsInput, {nullable:true})
    @Type(() => LessonUpsertWithoutDocumentsInput)
    upsert?: LessonUpsertWithoutDocumentsInput;

    @Field(() => LessonWhereUniqueInput, {nullable:true})
    @Type(() => LessonWhereUniqueInput)
    connect?: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;

    @Field(() => LessonUpdateToOneWithWhereWithoutDocumentsInput, {nullable:true})
    @Type(() => LessonUpdateToOneWithWhereWithoutDocumentsInput)
    update?: LessonUpdateToOneWithWhereWithoutDocumentsInput;
}
