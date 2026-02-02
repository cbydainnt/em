import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutNotesInput } from './user-create-without-notes.input';

@InputType()
export class UserCreateOrConnectWithoutNotesInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserCreateWithoutNotesInput, {nullable:false})
    @Type(() => UserCreateWithoutNotesInput)
    create!: UserCreateWithoutNotesInput;
}
