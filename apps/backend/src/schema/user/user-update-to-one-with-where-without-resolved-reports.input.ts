import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutResolved_reportsInput } from './user-update-without-resolved-reports.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutResolved_reportsInput {

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;

    @Field(() => UserUpdateWithoutResolved_reportsInput, {nullable:false})
    @Type(() => UserUpdateWithoutResolved_reportsInput)
    data!: UserUpdateWithoutResolved_reportsInput;
}
