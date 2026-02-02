import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class LessonMinAggregateInput {

    @Field(() => Boolean, {nullable:true})
    lesson_id?: true;

    @Field(() => Boolean, {nullable:true})
    lesson_title?: true;

    @Field(() => Boolean, {nullable:true})
    lesson_type?: true;

    @Field(() => Boolean, {nullable:true})
    lesson_video?: true;

    @Field(() => Boolean, {nullable:true})
    lesson_thumbnail?: true;

    @Field(() => Boolean, {nullable:true})
    lesson_order?: true;

    @Field(() => Boolean, {nullable:true})
    minutes?: true;

    @Field(() => Boolean, {nullable:true})
    video_duration?: true;

    @Field(() => Boolean, {nullable:true})
    access_type?: true;

    @Field(() => Boolean, {nullable:true})
    created_at?: true;

    @Field(() => Boolean, {nullable:true})
    updated_at?: true;

    @Field(() => Boolean, {nullable:true})
    created_by?: true;

    @Field(() => Boolean, {nullable:true})
    updated_by?: true;

    @Field(() => Boolean, {nullable:true})
    del_flg?: true;

    @Field(() => Boolean, {nullable:true})
    section_id?: true;
}
