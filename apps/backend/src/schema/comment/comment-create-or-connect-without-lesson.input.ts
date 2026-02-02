import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CommentWhereUniqueInput } from './comment-where-unique.input';
import { Type } from 'class-transformer';
import { CommentCreateWithoutLessonInput } from './comment-create-without-lesson.input';

@InputType()
export class CommentCreateOrConnectWithoutLessonInput {

    @Field(() => CommentWhereUniqueInput, {nullable:false})
    @Type(() => CommentWhereUniqueInput)
    where!: Prisma.AtLeast<CommentWhereUniqueInput, 'comment_id' | 'seed_tag'>;

    @Field(() => CommentCreateWithoutLessonInput, {nullable:false})
    @Type(() => CommentCreateWithoutLessonInput)
    create!: CommentCreateWithoutLessonInput;
}
