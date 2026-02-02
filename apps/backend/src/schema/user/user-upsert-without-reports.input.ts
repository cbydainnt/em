import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateWithoutReportsInput } from './user-update-without-reports.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutReportsInput } from './user-create-without-reports.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutReportsInput {

    @Field(() => UserUpdateWithoutReportsInput, {nullable:false})
    @Type(() => UserUpdateWithoutReportsInput)
    update!: UserUpdateWithoutReportsInput;

    @Field(() => UserCreateWithoutReportsInput, {nullable:false})
    @Type(() => UserCreateWithoutReportsInput)
    create!: UserCreateWithoutReportsInput;

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;
}
