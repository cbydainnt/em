import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CommentWhereUniqueInput } from './comment-where-unique.input';
import { Type } from 'class-transformer';
import { CommentUpdateWithoutLessonInput } from './comment-update-without-lesson.input';
import { CommentCreateWithoutLessonInput } from './comment-create-without-lesson.input';

@InputType()
export class CommentUpsertWithWhereUniqueWithoutLessonInput {

    @Field(() => CommentWhereUniqueInput, {nullable:false})
    @Type(() => CommentWhereUniqueInput)
    where!: Prisma.AtLeast<CommentWhereUniqueInput, 'comment_id' | 'seed_tag'>;

    @Field(() => CommentUpdateWithoutLessonInput, {nullable:false})
    @Type(() => CommentUpdateWithoutLessonInput)
    update!: CommentUpdateWithoutLessonInput;

    @Field(() => CommentCreateWithoutLessonInput, {nullable:false})
    @Type(() => CommentCreateWithoutLessonInput)
    create!: CommentCreateWithoutLessonInput;
}
