import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommentWhereInput } from './comment-where.input';
import { Type } from 'class-transformer';
import { CommentUpdateWithoutRepliesInput } from './comment-update-without-replies.input';

@InputType()
export class CommentUpdateToOneWithWhereWithoutRepliesInput {

    @Field(() => CommentWhereInput, {nullable:true})
    @Type(() => CommentWhereInput)
    where?: CommentWhereInput;

    @Field(() => CommentUpdateWithoutRepliesInput, {nullable:false})
    @Type(() => CommentUpdateWithoutRepliesInput)
    data!: CommentUpdateWithoutRepliesInput;
}
