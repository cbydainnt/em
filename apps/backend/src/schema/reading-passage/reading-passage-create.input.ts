import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { ReadingPassageCreatetagsInput } from './reading-passage-createtags.input';
import { GraphQLJSON } from 'graphql-type-json';
import { QuestionCreateNestedManyWithoutReading_passageInput } from '../question/question-create-nested-many-without-reading-passage.input';

@InputType()
export class ReadingPassageCreateInput {

    @Field(() => String, {nullable:true})
    reading_passage_id?: string;

    @Field(() => String, {nullable:true})
    title?: string;

    @Field(() => String, {nullable:false})
    content!: string;

    @Field(() => Int, {nullable:true})
    difficulty?: number;

    @Field(() => ReadingPassageCreatetagsInput, {nullable:true})
    tags?: ReadingPassageCreatetagsInput;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;

    @Field(() => String, {nullable:true})
    created_by?: string;

    @Field(() => String, {nullable:true})
    updated_by?: string;

    @Field(() => Int, {nullable:false})
    total_questions!: number;

    @Field(() => GraphQLJSON, {nullable:true})
    question_ordering?: any;

    @Field(() => QuestionCreateNestedManyWithoutReading_passageInput, {nullable:true})
    questions?: QuestionCreateNestedManyWithoutReading_passageInput;
}
