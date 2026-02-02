import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutCreatedsInput } from './user-update-without-createds.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutCreatedsInput {

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;

    @Field(() => UserUpdateWithoutCreatedsInput, {nullable:false})
    @Type(() => UserUpdateWithoutCreatedsInput)
    data!: UserUpdateWithoutCreatedsInput;
}
