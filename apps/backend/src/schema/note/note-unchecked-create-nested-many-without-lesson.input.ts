import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NoteCreateWithoutLessonInput } from './note-create-without-lesson.input';
import { Type } from 'class-transformer';
import { NoteCreateOrConnectWithoutLessonInput } from './note-create-or-connect-without-lesson.input';
import { NoteCreateManyLessonInputEnvelope } from './note-create-many-lesson-input-envelope.input';
import { Prisma } from '@prisma/client';
import { NoteWhereUniqueInput } from './note-where-unique.input';

@InputType()
export class NoteUncheckedCreateNestedManyWithoutLessonInput {

    @Field(() => [NoteCreateWithoutLessonInput], {nullable:true})
    @Type(() => NoteCreateWithoutLessonInput)
    create?: Array<NoteCreateWithoutLessonInput>;

    @Field(() => [NoteCreateOrConnectWithoutLessonInput], {nullable:true})
    @Type(() => NoteCreateOrConnectWithoutLessonInput)
    connectOrCreate?: Array<NoteCreateOrConnectWithoutLessonInput>;

    @Field(() => NoteCreateManyLessonInputEnvelope, {nullable:true})
    @Type(() => NoteCreateManyLessonInputEnvelope)
    createMany?: NoteCreateManyLessonInputEnvelope;

    @Field(() => [NoteWhereUniqueInput], {nullable:true})
    @Type(() => NoteWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<NoteWhereUniqueInput, 'note_id'>>;
}
