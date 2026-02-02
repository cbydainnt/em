import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutNotesInput } from './user-create-without-notes.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutNotesInput } from './user-create-or-connect-without-notes.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutNotesInput {

    @Field(() => UserCreateWithoutNotesInput, {nullable:true})
    @Type(() => UserCreateWithoutNotesInput)
    create?: UserCreateWithoutNotesInput;

    @Field(() => UserCreateOrConnectWithoutNotesInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutNotesInput)
    connectOrCreate?: UserCreateOrConnectWithoutNotesInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;
}
