import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutDeleted_byInput } from './user-update-without-deleted-by.input';

@InputType()
export class UserUpdateWithWhereUniqueWithoutDeleted_byInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserUpdateWithoutDeleted_byInput, {nullable:false})
    @Type(() => UserUpdateWithoutDeleted_byInput)
    data!: UserUpdateWithoutDeleted_byInput;
}
