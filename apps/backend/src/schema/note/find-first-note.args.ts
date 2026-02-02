import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { NoteWhereInput } from './note-where.input';
import { Type } from 'class-transformer';
import { NoteOrderByWithRelationInput } from './note-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { NoteWhereUniqueInput } from './note-where-unique.input';
import { Int } from '@nestjs/graphql';
import { NoteScalarFieldEnum } from './note-scalar-field.enum';

@ArgsType()
export class FindFirstNoteArgs {

    @Field(() => NoteWhereInput, {nullable:true})
    @Type(() => NoteWhereInput)
    where?: NoteWhereInput;

    @Field(() => [NoteOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<NoteOrderByWithRelationInput>;

    @Field(() => NoteWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<NoteWhereUniqueInput, 'note_id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [NoteScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof NoteScalarFieldEnum>;
}
