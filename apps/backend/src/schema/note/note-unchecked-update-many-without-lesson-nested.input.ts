import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NoteCreateWithoutLessonInput } from './note-create-without-lesson.input';
import { Type } from 'class-transformer';
import { NoteCreateOrConnectWithoutLessonInput } from './note-create-or-connect-without-lesson.input';
import { NoteUpsertWithWhereUniqueWithoutLessonInput } from './note-upsert-with-where-unique-without-lesson.input';
import { NoteCreateManyLessonInputEnvelope } from './note-create-many-lesson-input-envelope.input';
import { Prisma } from '@prisma/client';
import { NoteWhereUniqueInput } from './note-where-unique.input';
import { NoteUpdateWithWhereUniqueWithoutLessonInput } from './note-update-with-where-unique-without-lesson.input';
import { NoteUpdateManyWithWhereWithoutLessonInput } from './note-update-many-with-where-without-lesson.input';
import { NoteScalarWhereInput } from './note-scalar-where.input';

@InputType()
export class NoteUncheckedUpdateManyWithoutLessonNestedInput {

    @Field(() => [NoteCreateWithoutLessonInput], {nullable:true})
    @Type(() => NoteCreateWithoutLessonInput)
    create?: Array<NoteCreateWithoutLessonInput>;

    @Field(() => [NoteCreateOrConnectWithoutLessonInput], {nullable:true})
    @Type(() => NoteCreateOrConnectWithoutLessonInput)
    connectOrCreate?: Array<NoteCreateOrConnectWithoutLessonInput>;

    @Field(() => [NoteUpsertWithWhereUniqueWithoutLessonInput], {nullable:true})
    @Type(() => NoteUpsertWithWhereUniqueWithoutLessonInput)
    upsert?: Array<NoteUpsertWithWhereUniqueWithoutLessonInput>;

    @Field(() => NoteCreateManyLessonInputEnvelope, {nullable:true})
    @Type(() => NoteCreateManyLessonInputEnvelope)
    createMany?: NoteCreateManyLessonInputEnvelope;

    @Field(() => [NoteWhereUniqueInput], {nullable:true})
    @Type(() => NoteWhereUniqueInput)
    set?: Array<Prisma.AtLeast<NoteWhereUniqueInput, 'note_id'>>;

    @Field(() => [NoteWhereUniqueInput], {nullable:true})
    @Type(() => NoteWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<NoteWhereUniqueInput, 'note_id'>>;

    @Field(() => [NoteWhereUniqueInput], {nullable:true})
    @Type(() => NoteWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<NoteWhereUniqueInput, 'note_id'>>;

    @Field(() => [NoteWhereUniqueInput], {nullable:true})
    @Type(() => NoteWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<NoteWhereUniqueInput, 'note_id'>>;

    @Field(() => [NoteUpdateWithWhereUniqueWithoutLessonInput], {nullable:true})
    @Type(() => NoteUpdateWithWhereUniqueWithoutLessonInput)
    update?: Array<NoteUpdateWithWhereUniqueWithoutLessonInput>;

    @Field(() => [NoteUpdateManyWithWhereWithoutLessonInput], {nullable:true})
    @Type(() => NoteUpdateManyWithWhereWithoutLessonInput)
    updateMany?: Array<NoteUpdateManyWithWhereWithoutLessonInput>;

    @Field(() => [NoteScalarWhereInput], {nullable:true})
    @Type(() => NoteScalarWhereInput)
    deleteMany?: Array<NoteScalarWhereInput>;
}
