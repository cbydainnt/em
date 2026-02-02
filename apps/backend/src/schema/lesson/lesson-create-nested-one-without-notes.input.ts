import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonCreateWithoutNotesInput } from './lesson-create-without-notes.input';
import { Type } from 'class-transformer';
import { LessonCreateOrConnectWithoutNotesInput } from './lesson-create-or-connect-without-notes.input';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';

@InputType()
export class LessonCreateNestedOneWithoutNotesInput {

    @Field(() => LessonCreateWithoutNotesInput, {nullable:true})
    @Type(() => LessonCreateWithoutNotesInput)
    create?: LessonCreateWithoutNotesInput;

    @Field(() => LessonCreateOrConnectWithoutNotesInput, {nullable:true})
    @Type(() => LessonCreateOrConnectWithoutNotesInput)
    connectOrCreate?: LessonCreateOrConnectWithoutNotesInput;

    @Field(() => LessonWhereUniqueInput, {nullable:true})
    @Type(() => LessonWhereUniqueInput)
    connect?: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;
}
