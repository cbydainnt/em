import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UserCountAggregateInput {

    @Field(() => Boolean, {nullable:true})
    id?: true;

    @Field(() => Boolean, {nullable:true})
    type?: true;

    @Field(() => Boolean, {nullable:true})
    name?: true;

    @Field(() => Boolean, {nullable:true})
    email?: true;

    @Field(() => Boolean, {nullable:true})
    phone?: true;

    @Field(() => Boolean, {nullable:true})
    address?: true;

    @Field(() => Boolean, {nullable:true})
    avatar?: true;

    @Field(() => Boolean, {nullable:true})
    googleId?: true;

    @Field(() => Boolean, {nullable:true})
    password?: true;

    @Field(() => Boolean, {nullable:true})
    deleted?: true;

    @Field(() => Boolean, {nullable:true})
    created_at?: true;

    @Field(() => Boolean, {nullable:true})
    updated_at?: true;

    @Field(() => Boolean, {nullable:true})
    deleted_at?: true;

    @Field(() => Boolean, {nullable:true})
    created_by_id?: true;

    @Field(() => Boolean, {nullable:true})
    updated_by_id?: true;

    @Field(() => Boolean, {nullable:true})
    deleted_by_id?: true;

    @Field(() => Boolean, {nullable:true})
    verified?: true;

    @Field(() => Boolean, {nullable:true})
    verifyToken?: true;

    @Field(() => Boolean, {nullable:true})
    verifyExpires?: true;

    @Field(() => Boolean, {nullable:true})
    passwordResetToken?: true;

    @Field(() => Boolean, {nullable:true})
    passwordResetExpires?: true;

    @Field(() => Boolean, {nullable:true})
    _all?: true;
}
