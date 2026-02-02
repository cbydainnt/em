import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NoteWhereInput } from './note-where.input';

@InputType()
export class NoteListRelationFilter {

    @Field(() => NoteWhereInput, {nullable:true})
    every?: NoteWhereInput;

    @Field(() => NoteWhereInput, {nullable:true})
    some?: NoteWhereInput;

    @Field(() => NoteWhereInput, {nullable:true})
    none?: NoteWhereInput;
}
