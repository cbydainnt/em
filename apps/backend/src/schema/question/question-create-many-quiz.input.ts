import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class QuestionCreateManyQuizInput {

    @Field(() => String, {nullable:true})
    question_id?: string;

    @Field(() => String, {nullable:false})
    question_text!: string;

    @Field(() => String, {nullable:true})
    question_image?: string;

    @Field(() => Int, {nullable:true})
    question_type?: number;

    @Field(() => Int, {nullable:true})
    order?: number;

    @Field(() => Int, {nullable:true})
    points?: number;

    @Field(() => Int, {nullable:true})
    difficulty?: number;

    @Field(() => String, {nullable:true})
    explanation?: string;

    @Field(() => String, {nullable:true})
    audio_id?: string;

    @Field(() => Int, {nullable:true})
    audio_order?: number;

    @Field(() => String, {nullable:true})
    reading_passage_id?: string;

    @Field(() => Boolean, {nullable:true})
    del_flg?: boolean;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;
}
