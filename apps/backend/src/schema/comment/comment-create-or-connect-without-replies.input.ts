import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CommentWhereUniqueInput } from './comment-where-unique.input';
import { Type } from 'class-transformer';
import { CommentCreateWithoutRepliesInput } from './comment-create-without-replies.input';

@InputType()
export class CommentCreateOrConnectWithoutRepliesInput {

    @Field(() => CommentWhereUniqueInput, {nullable:false})
    @Type(() => CommentWhereUniqueInput)
    where!: Prisma.AtLeast<CommentWhereUniqueInput, 'comment_id' | 'seed_tag'>;

    @Field(() => CommentCreateWithoutRepliesInput, {nullable:false})
    @Type(() => CommentCreateWithoutRepliesInput)
    create!: CommentCreateWithoutRepliesInput;
}
