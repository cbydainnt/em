import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class CommentCountAggregate {

    @Field(() => Int, {nullable:false})
    comment_id!: number;

    @Field(() => Int, {nullable:false})
    parent_id!: number;

    @Field(() => Int, {nullable:false})
    content!: number;

    @Field(() => Int, {nullable:false})
    image_url!: number;

    @Field(() => Int, {nullable:false})
    created_at!: number;

    @Field(() => Int, {nullable:false})
    updated_at!: number;

    @Field(() => Int, {nullable:false})
    created_by!: number;

    @Field(() => Int, {nullable:false})
    updated_by!: number;

    @Field(() => Int, {nullable:false})
    del_flg!: number;

    @Field(() => Int, {nullable:false})
    is_hidden!: number;

    @Field(() => Int, {nullable:false})
    seed_tag!: number;

    @Field(() => Int, {nullable:false})
    course_id!: number;

    @Field(() => Int, {nullable:false})
    lesson_id!: number;

    @Field(() => Int, {nullable:false})
    user_id!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
