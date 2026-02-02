import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class UserCountAggregate {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    type!: number;

    @Field(() => Int, {nullable:false})
    name!: number;

    @Field(() => Int, {nullable:false})
    email!: number;

    @Field(() => Int, {nullable:false})
    phone!: number;

    @Field(() => Int, {nullable:false})
    address!: number;

    @Field(() => Int, {nullable:false})
    avatar!: number;

    @Field(() => Int, {nullable:false})
    googleId!: number;

    @Field(() => Int, {nullable:false})
    password!: number;

    @Field(() => Int, {nullable:false})
    deleted!: number;

    @Field(() => Int, {nullable:false})
    created_at!: number;

    @Field(() => Int, {nullable:false})
    updated_at!: number;

    @Field(() => Int, {nullable:false})
    deleted_at!: number;

    @Field(() => Int, {nullable:false})
    created_by_id!: number;

    @Field(() => Int, {nullable:false})
    updated_by_id!: number;

    @Field(() => Int, {nullable:false})
    deleted_by_id!: number;

    @Field(() => Int, {nullable:false})
    verified!: number;

    @Field(() => Int, {nullable:false})
    verifyToken!: number;

    @Field(() => Int, {nullable:false})
    verifyExpires!: number;

    @Field(() => Int, {nullable:false})
    passwordResetToken!: number;

    @Field(() => Int, {nullable:false})
    passwordResetExpires!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
