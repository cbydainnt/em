import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateWithoutResolved_reportsInput } from './user-update-without-resolved-reports.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutResolved_reportsInput } from './user-create-without-resolved-reports.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutResolved_reportsInput {

    @Field(() => UserUpdateWithoutResolved_reportsInput, {nullable:false})
    @Type(() => UserUpdateWithoutResolved_reportsInput)
    update!: UserUpdateWithoutResolved_reportsInput;

    @Field(() => UserCreateWithoutResolved_reportsInput, {nullable:false})
    @Type(() => UserCreateWithoutResolved_reportsInput)
    create!: UserCreateWithoutResolved_reportsInput;

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;
}
