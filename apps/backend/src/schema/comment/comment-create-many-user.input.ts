import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CommentCreateManyUserInput {

    @Field(() => String, {nullable:true})
    comment_id?: string;

    @Field(() => String, {nullable:true})
    parent_id?: string;

    @Field(() => String, {nullable:false})
    content!: string;

    @Field(() => String, {nullable:true})
    image_url?: string;

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

    @Field(() => Boolean, {nullable:true})
    is_hidden?: boolean;

    @Field(() => String, {nullable:true})
    seed_tag?: string;

    @Field(() => String, {nullable:true})
    course_id?: string;

    @Field(() => String, {nullable:true})
    lesson_id?: string;
}
