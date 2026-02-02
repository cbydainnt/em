import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommentCreateWithoutRepliesInput } from './comment-create-without-replies.input';
import { Type } from 'class-transformer';
import { CommentCreateOrConnectWithoutRepliesInput } from './comment-create-or-connect-without-replies.input';
import { Prisma } from '@prisma/client';
import { CommentWhereUniqueInput } from './comment-where-unique.input';

@InputType()
export class CommentCreateNestedOneWithoutRepliesInput {

    @Field(() => CommentCreateWithoutRepliesInput, {nullable:true})
    @Type(() => CommentCreateWithoutRepliesInput)
    create?: CommentCreateWithoutRepliesInput;

    @Field(() => CommentCreateOrConnectWithoutRepliesInput, {nullable:true})
    @Type(() => CommentCreateOrConnectWithoutRepliesInput)
    connectOrCreate?: CommentCreateOrConnectWithoutRepliesInput;

    @Field(() => CommentWhereUniqueInput, {nullable:true})
    @Type(() => CommentWhereUniqueInput)
    connect?: Prisma.AtLeast<CommentWhereUniqueInput, 'comment_id' | 'seed_tag'>;
}
