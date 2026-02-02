import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommentCreateWithoutRepliesInput } from './comment-create-without-replies.input';
import { Type } from 'class-transformer';
import { CommentCreateOrConnectWithoutRepliesInput } from './comment-create-or-connect-without-replies.input';
import { CommentUpsertWithoutRepliesInput } from './comment-upsert-without-replies.input';
import { CommentWhereInput } from './comment-where.input';
import { Prisma } from '@prisma/client';
import { CommentWhereUniqueInput } from './comment-where-unique.input';
import { CommentUpdateToOneWithWhereWithoutRepliesInput } from './comment-update-to-one-with-where-without-replies.input';

@InputType()
export class CommentUpdateOneWithoutRepliesNestedInput {

    @Field(() => CommentCreateWithoutRepliesInput, {nullable:true})
    @Type(() => CommentCreateWithoutRepliesInput)
    create?: CommentCreateWithoutRepliesInput;

    @Field(() => CommentCreateOrConnectWithoutRepliesInput, {nullable:true})
    @Type(() => CommentCreateOrConnectWithoutRepliesInput)
    connectOrCreate?: CommentCreateOrConnectWithoutRepliesInput;

    @Field(() => CommentUpsertWithoutRepliesInput, {nullable:true})
    @Type(() => CommentUpsertWithoutRepliesInput)
    upsert?: CommentUpsertWithoutRepliesInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => CommentWhereInput, {nullable:true})
    @Type(() => CommentWhereInput)
    delete?: CommentWhereInput;

    @Field(() => CommentWhereUniqueInput, {nullable:true})
    @Type(() => CommentWhereUniqueInput)
    connect?: Prisma.AtLeast<CommentWhereUniqueInput, 'comment_id' | 'seed_tag'>;

    @Field(() => CommentUpdateToOneWithWhereWithoutRepliesInput, {nullable:true})
    @Type(() => CommentUpdateToOneWithWhereWithoutRepliesInput)
    update?: CommentUpdateToOneWithWhereWithoutRepliesInput;
}
