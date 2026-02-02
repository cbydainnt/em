import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateWithoutUpdatedsInput } from './user-update-without-updateds.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutUpdatedsInput } from './user-create-without-updateds.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutUpdatedsInput {

    @Field(() => UserUpdateWithoutUpdatedsInput, {nullable:false})
    @Type(() => UserUpdateWithoutUpdatedsInput)
    update!: UserUpdateWithoutUpdatedsInput;

    @Field(() => UserCreateWithoutUpdatedsInput, {nullable:false})
    @Type(() => UserCreateWithoutUpdatedsInput)
    create!: UserCreateWithoutUpdatedsInput;

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;
}
