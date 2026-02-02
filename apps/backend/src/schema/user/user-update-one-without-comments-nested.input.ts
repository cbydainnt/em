import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutCommentsInput } from './user-create-without-comments.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutCommentsInput } from './user-create-or-connect-without-comments.input';
import { UserUpsertWithoutCommentsInput } from './user-upsert-without-comments.input';
import { UserWhereInput } from './user-where.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateToOneWithWhereWithoutCommentsInput } from './user-update-to-one-with-where-without-comments.input';

@InputType()
export class UserUpdateOneWithoutCommentsNestedInput {

    @Field(() => UserCreateWithoutCommentsInput, {nullable:true})
    @Type(() => UserCreateWithoutCommentsInput)
    create?: UserCreateWithoutCommentsInput;

    @Field(() => UserCreateOrConnectWithoutCommentsInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutCommentsInput)
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput;

    @Field(() => UserUpsertWithoutCommentsInput, {nullable:true})
    @Type(() => UserUpsertWithoutCommentsInput)
    upsert?: UserUpsertWithoutCommentsInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    delete?: UserWhereInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserUpdateToOneWithWhereWithoutCommentsInput, {nullable:true})
    @Type(() => UserUpdateToOneWithWhereWithoutCommentsInput)
    update?: UserUpdateToOneWithWhereWithoutCommentsInput;
}
