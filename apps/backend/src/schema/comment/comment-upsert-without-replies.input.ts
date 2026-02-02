import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommentUpdateWithoutRepliesInput } from './comment-update-without-replies.input';
import { Type } from 'class-transformer';
import { CommentCreateWithoutRepliesInput } from './comment-create-without-replies.input';
import { CommentWhereInput } from './comment-where.input';

@InputType()
export class CommentUpsertWithoutRepliesInput {

    @Field(() => CommentUpdateWithoutRepliesInput, {nullable:false})
    @Type(() => CommentUpdateWithoutRepliesInput)
    update!: CommentUpdateWithoutRepliesInput;

    @Field(() => CommentCreateWithoutRepliesInput, {nullable:false})
    @Type(() => CommentCreateWithoutRepliesInput)
    create!: CommentCreateWithoutRepliesInput;

    @Field(() => CommentWhereInput, {nullable:true})
    @Type(() => CommentWhereInput)
    where?: CommentWhereInput;
}
