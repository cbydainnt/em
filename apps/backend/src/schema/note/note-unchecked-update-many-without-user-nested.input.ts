import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NoteCreateWithoutUserInput } from './note-create-without-user.input';
import { Type } from 'class-transformer';
import { NoteCreateOrConnectWithoutUserInput } from './note-create-or-connect-without-user.input';
import { NoteUpsertWithWhereUniqueWithoutUserInput } from './note-upsert-with-where-unique-without-user.input';
import { NoteCreateManyUserInputEnvelope } from './note-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { NoteWhereUniqueInput } from './note-where-unique.input';
import { NoteUpdateWithWhereUniqueWithoutUserInput } from './note-update-with-where-unique-without-user.input';
import { NoteUpdateManyWithWhereWithoutUserInput } from './note-update-many-with-where-without-user.input';
import { NoteScalarWhereInput } from './note-scalar-where.input';

@InputType()
export class NoteUncheckedUpdateManyWithoutUserNestedInput {

    @Field(() => [NoteCreateWithoutUserInput], {nullable:true})
    @Type(() => NoteCreateWithoutUserInput)
    create?: Array<NoteCreateWithoutUserInput>;

    @Field(() => [NoteCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => NoteCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<NoteCreateOrConnectWithoutUserInput>;

    @Field(() => [NoteUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => NoteUpsertWithWhereUniqueWithoutUserInput)
    upsert?: Array<NoteUpsertWithWhereUniqueWithoutUserInput>;

    @Field(() => NoteCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => NoteCreateManyUserInputEnvelope)
    createMany?: NoteCreateManyUserInputEnvelope;

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

    @Field(() => [NoteUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => NoteUpdateWithWhereUniqueWithoutUserInput)
    update?: Array<NoteUpdateWithWhereUniqueWithoutUserInput>;

    @Field(() => [NoteUpdateManyWithWhereWithoutUserInput], {nullable:true})
    @Type(() => NoteUpdateManyWithWhereWithoutUserInput)
    updateMany?: Array<NoteUpdateManyWithWhereWithoutUserInput>;

    @Field(() => [NoteScalarWhereInput], {nullable:true})
    @Type(() => NoteScalarWhereInput)
    deleteMany?: Array<NoteScalarWhereInput>;
}
