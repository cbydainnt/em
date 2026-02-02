import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CommentWhereUniqueInput } from './comment-where-unique.input';
import { Type } from 'class-transformer';
import { CommentUpdateWithoutCourseInput } from './comment-update-without-course.input';
import { CommentCreateWithoutCourseInput } from './comment-create-without-course.input';

@InputType()
export class CommentUpsertWithWhereUniqueWithoutCourseInput {

    @Field(() => CommentWhereUniqueInput, {nullable:false})
    @Type(() => CommentWhereUniqueInput)
    where!: Prisma.AtLeast<CommentWhereUniqueInput, 'comment_id' | 'seed_tag'>;

    @Field(() => CommentUpdateWithoutCourseInput, {nullable:false})
    @Type(() => CommentUpdateWithoutCourseInput)
    update!: CommentUpdateWithoutCourseInput;

    @Field(() => CommentCreateWithoutCourseInput, {nullable:false})
    @Type(() => CommentCreateWithoutCourseInput)
    create!: CommentCreateWithoutCourseInput;
}
