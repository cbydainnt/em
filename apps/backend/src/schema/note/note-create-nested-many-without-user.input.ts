import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NoteCreateWithoutUserInput } from './note-create-without-user.input';
import { Type } from 'class-transformer';
import { NoteCreateOrConnectWithoutUserInput } from './note-create-or-connect-without-user.input';
import { NoteCreateManyUserInputEnvelope } from './note-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { NoteWhereUniqueInput } from './note-where-unique.input';

@InputType()
export class NoteCreateNestedManyWithoutUserInput {

    @Field(() => [NoteCreateWithoutUserInput], {nullable:true})
    @Type(() => NoteCreateWithoutUserInput)
    create?: Array<NoteCreateWithoutUserInput>;

    @Field(() => [NoteCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => NoteCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<NoteCreateOrConnectWithoutUserInput>;

    @Field(() => NoteCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => NoteCreateManyUserInputEnvelope)
    createMany?: NoteCreateManyUserInputEnvelope;

    @Field(() => [NoteWhereUniqueInput], {nullable:true})
    @Type(() => NoteWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<NoteWhereUniqueInput, 'note_id'>>;
}
