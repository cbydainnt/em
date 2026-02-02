import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutDeleted_byInput } from './user-create-without-deleted-by.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutDeleted_byInput } from './user-create-or-connect-without-deleted-by.input';
import { UserCreateManyDeleted_byInputEnvelope } from './user-create-many-deleted-by-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedManyWithoutDeleted_byInput {

    @Field(() => [UserCreateWithoutDeleted_byInput], {nullable:true})
    @Type(() => UserCreateWithoutDeleted_byInput)
    create?: Array<UserCreateWithoutDeleted_byInput>;

    @Field(() => [UserCreateOrConnectWithoutDeleted_byInput], {nullable:true})
    @Type(() => UserCreateOrConnectWithoutDeleted_byInput)
    connectOrCreate?: Array<UserCreateOrConnectWithoutDeleted_byInput>;

    @Field(() => UserCreateManyDeleted_byInputEnvelope, {nullable:true})
    @Type(() => UserCreateManyDeleted_byInputEnvelope)
    createMany?: UserCreateManyDeleted_byInputEnvelope;

    @Field(() => [UserWhereUniqueInput], {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>>;
}
