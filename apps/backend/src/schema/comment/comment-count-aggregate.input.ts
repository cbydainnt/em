import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CommentCountAggregateInput {

    @Field(() => Boolean, {nullable:true})
    comment_id?: true;

    @Field(() => Boolean, {nullable:true})
    parent_id?: true;

    @Field(() => Boolean, {nullable:true})
    content?: true;

    @Field(() => Boolean, {nullable:true})
    image_url?: true;

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
    is_hidden?: true;

    @Field(() => Boolean, {nullable:true})
    seed_tag?: true;

    @Field(() => Boolean, {nullable:true})
    course_id?: true;

    @Field(() => Boolean, {nullable:true})
    lesson_id?: true;

    @Field(() => Boolean, {nullable:true})
    user_id?: true;

    @Field(() => Boolean, {nullable:true})
    _all?: true;
}
