import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutUpdated_byInput } from './user-create-without-updated-by.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutUpdated_byInput } from './user-create-or-connect-without-updated-by.input';
import { UserUpsertWithWhereUniqueWithoutUpdated_byInput } from './user-upsert-with-where-unique-without-updated-by.input';
import { UserCreateManyUpdated_byInputEnvelope } from './user-create-many-updated-by-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateWithWhereUniqueWithoutUpdated_byInput } from './user-update-with-where-unique-without-updated-by.input';
import { UserUpdateManyWithWhereWithoutUpdated_byInput } from './user-update-many-with-where-without-updated-by.input';
import { UserScalarWhereInput } from './user-scalar-where.input';

@InputType()
export class UserUncheckedUpdateManyWithoutUpdated_byNestedInput {

    @Field(() => [UserCreateWithoutUpdated_byInput], {nullable:true})
    @Type(() => UserCreateWithoutUpdated_byInput)
    create?: Array<UserCreateWithoutUpdated_byInput>;

    @Field(() => [UserCreateOrConnectWithoutUpdated_byInput], {nullable:true})
    @Type(() => UserCreateOrConnectWithoutUpdated_byInput)
    connectOrCreate?: Array<UserCreateOrConnectWithoutUpdated_byInput>;

    @Field(() => [UserUpsertWithWhereUniqueWithoutUpdated_byInput], {nullable:true})
    @Type(() => UserUpsertWithWhereUniqueWithoutUpdated_byInput)
    upsert?: Array<UserUpsertWithWhereUniqueWithoutUpdated_byInput>;

    @Field(() => UserCreateManyUpdated_byInputEnvelope, {nullable:true})
    @Type(() => UserCreateManyUpdated_byInputEnvelope)
    createMany?: UserCreateManyUpdated_byInputEnvelope;

    @Field(() => [UserWhereUniqueInput], {nullable:true})
    @Type(() => UserWhereUniqueInput)
    set?: Array<Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>>;

    @Field(() => [UserWhereUniqueInput], {nullable:true})
    @Type(() => UserWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>>;

    @Field(() => [UserWhereUniqueInput], {nullable:true})
    @Type(() => UserWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>>;

    @Field(() => [UserWhereUniqueInput], {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>>;

    @Field(() => [UserUpdateWithWhereUniqueWithoutUpdated_byInput], {nullable:true})
    @Type(() => UserUpdateWithWhereUniqueWithoutUpdated_byInput)
    update?: Array<UserUpdateWithWhereUniqueWithoutUpdated_byInput>;

    @Field(() => [UserUpdateManyWithWhereWithoutUpdated_byInput], {nullable:true})
    @Type(() => UserUpdateManyWithWhereWithoutUpdated_byInput)
    updateMany?: Array<UserUpdateManyWithWhereWithoutUpdated_byInput>;

    @Field(() => [UserScalarWhereInput], {nullable:true})
    @Type(() => UserScalarWhereInput)
    deleteMany?: Array<UserScalarWhereInput>;
}
