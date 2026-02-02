import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { LessonCreateNestedOneWithoutNotesInput } from '../lesson/lesson-create-nested-one-without-notes.input';

@InputType()
export class NoteCreateWithoutUserInput {

    @Field(() => String, {nullable:true})
    note_id?: string;

    @Field(() => String, {nullable:false})
    content!: string;

    @Field(() => Int, {nullable:false})
    timestamp!: number;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;

    @Field(() => Boolean, {nullable:true})
    del_flg?: boolean;

    @Field(() => String, {nullable:true})
    background_color?: string;

    @Field(() => LessonCreateNestedOneWithoutNotesInput, {nullable:false})
    lesson!: LessonCreateNestedOneWithoutNotesInput;
}
