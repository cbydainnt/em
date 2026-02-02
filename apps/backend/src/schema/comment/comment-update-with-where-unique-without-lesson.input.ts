import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CommentWhereUniqueInput } from './comment-where-unique.input';
import { Type } from 'class-transformer';
import { CommentUpdateWithoutLessonInput } from './comment-update-without-lesson.input';

@InputType()
export class CommentUpdateWithWhereUniqueWithoutLessonInput {

    @Field(() => CommentWhereUniqueInput, {nullable:false})
    @Type(() => CommentWhereUniqueInput)
    where!: Prisma.AtLeast<CommentWhereUniqueInput, 'comment_id' | 'seed_tag'>;

    @Field(() => CommentUpdateWithoutLessonInput, {nullable:false})
    @Type(() => CommentUpdateWithoutLessonInput)
    data!: CommentUpdateWithoutLessonInput;
}
