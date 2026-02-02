import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Course } from '../course/course.model';
import { Lesson } from '../lesson/lesson.model';
import { User } from '../user/user.model';
import { CommentCount } from './comment-count.output';

@ObjectType()
export class Comment {

    @Field(() => ID, {nullable:false})
    comment_id!: string;

    @Field(() => String, {nullable:true})
    parent_id!: string | null;

    @Field(() => String, {nullable:false})
    content!: string;

    @Field(() => String, {nullable:true})
    image_url!: string | null;

    @Field(() => Date, {nullable:false})
    created_at!: Date;

    @Field(() => Date, {nullable:false})
    updated_at!: Date;

    @Field(() => String, {nullable:true})
    created_by!: string | null;

    @Field(() => String, {nullable:true})
    updated_by!: string | null;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    del_flg!: boolean;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    is_hidden!: boolean;

    @Field(() => String, {nullable:true})
    seed_tag!: string | null;

    @Field(() => String, {nullable:true})
    course_id!: string | null;

    @Field(() => String, {nullable:true})
    lesson_id!: string | null;

    @Field(() => String, {nullable:true})
    user_id!: string | null;

    @Field(() => Course, {nullable:true})
    course?: Course | null;

    @Field(() => Lesson, {nullable:true})
    lesson?: Lesson | null;

    @Field(() => User, {nullable:true})
    user?: User | null;

    @Field(() => Comment, {nullable:true})
    parent?: Comment | null;

    @Field(() => [Comment], {nullable:true})
    replies?: Array<Comment>;

    @Field(() => CommentCount, {nullable:false})
    _count?: CommentCount;
}
