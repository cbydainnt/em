import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutUpdated_byInput } from './user-create-without-updated-by.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutUpdated_byInput } from './user-create-or-connect-without-updated-by.input';
import { UserCreateManyUpdated_byInputEnvelope } from './user-create-many-updated-by-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserUncheckedCreateNestedManyWithoutUpdated_byInput {

    @Field(() => [UserCreateWithoutUpdated_byInput], {nullable:true})
    @Type(() => UserCreateWithoutUpdated_byInput)
    create?: Array<UserCreateWithoutUpdated_byInput>;

    @Field(() => [UserCreateOrConnectWithoutUpdated_byInput], {nullable:true})
    @Type(() => UserCreateOrConnectWithoutUpdated_byInput)
    connectOrCreate?: Array<UserCreateOrConnectWithoutUpdated_byInput>;

    @Field(() => UserCreateManyUpdated_byInputEnvelope, {nullable:true})
    @Type(() => UserCreateManyUpdated_byInputEnvelope)
    createMany?: UserCreateManyUpdated_byInputEnvelope;

    @Field(() => [UserWhereUniqueInput], {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>>;
}
