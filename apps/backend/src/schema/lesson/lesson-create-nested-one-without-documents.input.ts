import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonCreateWithoutDocumentsInput } from './lesson-create-without-documents.input';
import { Type } from 'class-transformer';
import { LessonCreateOrConnectWithoutDocumentsInput } from './lesson-create-or-connect-without-documents.input';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';

@InputType()
export class LessonCreateNestedOneWithoutDocumentsInput {

    @Field(() => LessonCreateWithoutDocumentsInput, {nullable:true})
    @Type(() => LessonCreateWithoutDocumentsInput)
    create?: LessonCreateWithoutDocumentsInput;

    @Field(() => LessonCreateOrConnectWithoutDocumentsInput, {nullable:true})
    @Type(() => LessonCreateOrConnectWithoutDocumentsInput)
    connectOrCreate?: LessonCreateOrConnectWithoutDocumentsInput;

    @Field(() => LessonWhereUniqueInput, {nullable:true})
    @Type(() => LessonWhereUniqueInput)
    connect?: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;
}
