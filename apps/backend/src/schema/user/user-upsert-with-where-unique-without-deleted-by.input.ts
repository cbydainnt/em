import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutDeleted_byInput } from './user-update-without-deleted-by.input';
import { UserCreateWithoutDeleted_byInput } from './user-create-without-deleted-by.input';

@InputType()
export class UserUpsertWithWhereUniqueWithoutDeleted_byInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserUpdateWithoutDeleted_byInput, {nullable:false})
    @Type(() => UserUpdateWithoutDeleted_byInput)
    update!: UserUpdateWithoutDeleted_byInput;

    @Field(() => UserCreateWithoutDeleted_byInput, {nullable:false})
    @Type(() => UserCreateWithoutDeleted_byInput)
    create!: UserCreateWithoutDeleted_byInput;
}
