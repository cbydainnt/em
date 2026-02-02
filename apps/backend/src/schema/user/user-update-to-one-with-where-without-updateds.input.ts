import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutUpdatedsInput } from './user-update-without-updateds.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutUpdatedsInput {

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;

    @Field(() => UserUpdateWithoutUpdatedsInput, {nullable:false})
    @Type(() => UserUpdateWithoutUpdatedsInput)
    data!: UserUpdateWithoutUpdatedsInput;
}
