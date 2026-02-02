import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { CommentCountAggregate } from './comment-count-aggregate.output';
import { CommentMinAggregate } from './comment-min-aggregate.output';
import { CommentMaxAggregate } from './comment-max-aggregate.output';

@ObjectType()
export class CommentGroupBy {

    @Field(() => String, {nullable:false})
    comment_id!: string;

    @Field(() => String, {nullable:true})
    parent_id?: string;

    @Field(() => String, {nullable:false})
    content!: string;

    @Field(() => String, {nullable:true})
    image_url?: string;

    @Field(() => Date, {nullable:false})
    created_at!: Date | string;

    @Field(() => Date, {nullable:false})
    updated_at!: Date | string;

    @Field(() => String, {nullable:true})
    created_by?: string;

    @Field(() => String, {nullable:true})
    updated_by?: string;

    @Field(() => Boolean, {nullable:false})
    del_flg!: boolean;

    @Field(() => Boolean, {nullable:false})
    is_hidden!: boolean;

    @Field(() => String, {nullable:true})
    seed_tag?: string;

    @Field(() => String, {nullable:true})
    course_id?: string;

    @Field(() => String, {nullable:true})
    lesson_id?: string;

    @Field(() => String, {nullable:true})
    user_id?: string;

    @Field(() => CommentCountAggregate, {nullable:true})
    _count?: CommentCountAggregate;

    @Field(() => CommentMinAggregate, {nullable:true})
    _min?: CommentMinAggregate;

    @Field(() => CommentMaxAggregate, {nullable:true})
    _max?: CommentMaxAggregate;
}
