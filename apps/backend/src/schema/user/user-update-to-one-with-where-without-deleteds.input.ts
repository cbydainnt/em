import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutDeletedsInput } from './user-update-without-deleteds.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutDeletedsInput {

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;

    @Field(() => UserUpdateWithoutDeletedsInput, {nullable:false})
    @Type(() => UserUpdateWithoutDeletedsInput)
    data!: UserUpdateWithoutDeletedsInput;
}
