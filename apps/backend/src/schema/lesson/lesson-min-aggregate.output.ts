import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class LessonMinAggregate {

    @Field(() => String, {nullable:true})
    lesson_id?: string;

    @Field(() => String, {nullable:true})
    lesson_title?: string;

    @Field(() => Int, {nullable:true})
    lesson_type?: number;

    @Field(() => String, {nullable:true})
    lesson_video?: string;

    @Field(() => String, {nullable:true})
    lesson_thumbnail?: string;

    @Field(() => Int, {nullable:true})
    lesson_order?: number;

    @Field(() => Int, {nullable:true})
    minutes?: number;

    @Field(() => Int, {nullable:true})
    video_duration?: number;

    @Field(() => Int, {nullable:true})
    access_type?: number;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;

    @Field(() => String, {nullable:true})
    created_by?: string;

    @Field(() => String, {nullable:true})
    updated_by?: string;

    @Field(() => Boolean, {nullable:true})
    del_flg?: boolean;

    @Field(() => String, {nullable:true})
    section_id?: string;
}
