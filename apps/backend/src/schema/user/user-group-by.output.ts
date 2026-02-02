import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { UserCountAggregate } from './user-count-aggregate.output';
import { UserMinAggregate } from './user-min-aggregate.output';
import { UserMaxAggregate } from './user-max-aggregate.output';

@ObjectType()
export class UserGroupBy {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:true})
    type?: string;

    @Field(() => String, {nullable:true})
    name?: string;

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => String, {nullable:true})
    phone?: string;

    @Field(() => String, {nullable:true})
    address?: string;

    @Field(() => String, {nullable:true})
    avatar?: string;

    @Field(() => String, {nullable:true})
    googleId?: string;

    @Field(() => String, {nullable:true})
    password?: string;

    @Field(() => Boolean, {nullable:true})
    deleted?: boolean;

    @Field(() => Date, {nullable:false})
    created_at!: Date | string;

    @Field(() => Date, {nullable:false})
    updated_at!: Date | string;

    @Field(() => Date, {nullable:true})
    deleted_at?: Date | string;

    @Field(() => String, {nullable:true})
    created_by_id?: string;

    @Field(() => String, {nullable:true})
    updated_by_id?: string;

    @Field(() => String, {nullable:true})
    deleted_by_id?: string;

    @Field(() => Boolean, {nullable:false})
    verified!: boolean;

    @Field(() => String, {nullable:true})
    verifyToken?: string;

    @Field(() => Date, {nullable:true})
    verifyExpires?: Date | string;

    @Field(() => String, {nullable:true})
    passwordResetToken?: string;

    @Field(() => Date, {nullable:true})
    passwordResetExpires?: Date | string;

    @Field(() => UserCountAggregate, {nullable:true})
    _count?: UserCountAggregate;

    @Field(() => UserMinAggregate, {nullable:true})
    _min?: UserMinAggregate;

    @Field(() => UserMaxAggregate, {nullable:true})
    _max?: UserMaxAggregate;
}
