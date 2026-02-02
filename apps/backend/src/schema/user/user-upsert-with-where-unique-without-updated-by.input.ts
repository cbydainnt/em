import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutUpdated_byInput } from './user-update-without-updated-by.input';
import { UserCreateWithoutUpdated_byInput } from './user-create-without-updated-by.input';

@InputType()
export class UserUpsertWithWhereUniqueWithoutUpdated_byInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserUpdateWithoutUpdated_byInput, {nullable:false})
    @Type(() => UserUpdateWithoutUpdated_byInput)
    update!: UserUpdateWithoutUpdated_byInput;

    @Field(() => UserCreateWithoutUpdated_byInput, {nullable:false})
    @Type(() => UserCreateWithoutUpdated_byInput)
    create!: UserCreateWithoutUpdated_byInput;
}
