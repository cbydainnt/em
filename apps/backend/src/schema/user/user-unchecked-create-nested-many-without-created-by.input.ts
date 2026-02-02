import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutCreated_byInput } from './user-create-without-created-by.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutCreated_byInput } from './user-create-or-connect-without-created-by.input';
import { UserCreateManyCreated_byInputEnvelope } from './user-create-many-created-by-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserUncheckedCreateNestedManyWithoutCreated_byInput {

    @Field(() => [UserCreateWithoutCreated_byInput], {nullable:true})
    @Type(() => UserCreateWithoutCreated_byInput)
    create?: Array<UserCreateWithoutCreated_byInput>;

    @Field(() => [UserCreateOrConnectWithoutCreated_byInput], {nullable:true})
    @Type(() => UserCreateOrConnectWithoutCreated_byInput)
    connectOrCreate?: Array<UserCreateOrConnectWithoutCreated_byInput>;

    @Field(() => UserCreateManyCreated_byInputEnvelope, {nullable:true})
    @Type(() => UserCreateManyCreated_byInputEnvelope)
    createMany?: UserCreateManyCreated_byInputEnvelope;

    @Field(() => [UserWhereUniqueInput], {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>>;
}
