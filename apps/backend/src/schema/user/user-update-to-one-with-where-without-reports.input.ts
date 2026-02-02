import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutReportsInput } from './user-update-without-reports.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutReportsInput {

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;

    @Field(() => UserUpdateWithoutReportsInput, {nullable:false})
    @Type(() => UserUpdateWithoutReportsInput)
    data!: UserUpdateWithoutReportsInput;
}
