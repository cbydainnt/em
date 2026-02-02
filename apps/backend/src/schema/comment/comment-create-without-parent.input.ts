import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateNestedOneWithoutCommentsInput } from '../course/course-create-nested-one-without-comments.input';
import { LessonCreateNestedOneWithoutCommentsInput } from '../lesson/lesson-create-nested-one-without-comments.input';
import { UserCreateNestedOneWithoutCommentsInput } from '../user/user-create-nested-one-without-comments.input';
import { CommentCreateNestedManyWithoutParentInput } from './comment-create-nested-many-without-parent.input';

@InputType()
export class CommentCreateWithoutParentInput {

    @Field(() => String, {nullable:true})
    comment_id?: string;

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

    @Field(() => CourseCreateNestedOneWithoutCommentsInput, {nullable:true})
    course?: CourseCreateNestedOneWithoutCommentsInput;

    @Field(() => LessonCreateNestedOneWithoutCommentsInput, {nullable:true})
    lesson?: LessonCreateNestedOneWithoutCommentsInput;

    @Field(() => UserCreateNestedOneWithoutCommentsInput, {nullable:true})
    user?: UserCreateNestedOneWithoutCommentsInput;

    @Field(() => CommentCreateNestedManyWithoutParentInput, {nullable:true})
    replies?: CommentCreateNestedManyWithoutParentInput;
}
