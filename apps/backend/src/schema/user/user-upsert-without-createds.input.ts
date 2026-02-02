import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateWithoutCreatedsInput } from './user-update-without-createds.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutCreatedsInput } from './user-create-without-createds.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutCreatedsInput {

    @Field(() => UserUpdateWithoutCreatedsInput, {nullable:false})
    @Type(() => UserUpdateWithoutCreatedsInput)
    update!: UserUpdateWithoutCreatedsInput;

    @Field(() => UserCreateWithoutCreatedsInput, {nullable:false})
    @Type(() => UserCreateWithoutCreatedsInput)
    create!: UserCreateWithoutCreatedsInput;

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;
}
