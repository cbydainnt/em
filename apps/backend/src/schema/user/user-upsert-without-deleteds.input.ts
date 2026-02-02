import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateWithoutDeletedsInput } from './user-update-without-deleteds.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutDeletedsInput } from './user-create-without-deleteds.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutDeletedsInput {

    @Field(() => UserUpdateWithoutDeletedsInput, {nullable:false})
    @Type(() => UserUpdateWithoutDeletedsInput)
    update!: UserUpdateWithoutDeletedsInput;

    @Field(() => UserCreateWithoutDeletedsInput, {nullable:false})
    @Type(() => UserCreateWithoutDeletedsInput)
    create!: UserCreateWithoutDeletedsInput;

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;
}
