import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutCreated_byInput } from './user-create-without-created-by.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutCreated_byInput } from './user-create-or-connect-without-created-by.input';
import { UserUpsertWithWhereUniqueWithoutCreated_byInput } from './user-upsert-with-where-unique-without-created-by.input';
import { UserCreateManyCreated_byInputEnvelope } from './user-create-many-created-by-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateWithWhereUniqueWithoutCreated_byInput } from './user-update-with-where-unique-without-created-by.input';
import { UserUpdateManyWithWhereWithoutCreated_byInput } from './user-update-many-with-where-without-created-by.input';
import { UserScalarWhereInput } from './user-scalar-where.input';

@InputType()
export class UserUncheckedUpdateManyWithoutCreated_byNestedInput {

    @Field(() => [UserCreateWithoutCreated_byInput], {nullable:true})
    @Type(() => UserCreateWithoutCreated_byInput)
    create?: Array<UserCreateWithoutCreated_byInput>;

    @Field(() => [UserCreateOrConnectWithoutCreated_byInput], {nullable:true})
    @Type(() => UserCreateOrConnectWithoutCreated_byInput)
    connectOrCreate?: Array<UserCreateOrConnectWithoutCreated_byInput>;

    @Field(() => [UserUpsertWithWhereUniqueWithoutCreated_byInput], {nullable:true})
    @Type(() => UserUpsertWithWhereUniqueWithoutCreated_byInput)
    upsert?: Array<UserUpsertWithWhereUniqueWithoutCreated_byInput>;

    @Field(() => UserCreateManyCreated_byInputEnvelope, {nullable:true})
    @Type(() => UserCreateManyCreated_byInputEnvelope)
    createMany?: UserCreateManyCreated_byInputEnvelope;

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

    @Field(() => [UserUpdateWithWhereUniqueWithoutCreated_byInput], {nullable:true})
    @Type(() => UserUpdateWithWhereUniqueWithoutCreated_byInput)
    update?: Array<UserUpdateWithWhereUniqueWithoutCreated_byInput>;

    @Field(() => [UserUpdateManyWithWhereWithoutCreated_byInput], {nullable:true})
    @Type(() => UserUpdateManyWithWhereWithoutCreated_byInput)
    updateMany?: Array<UserUpdateManyWithWhereWithoutCreated_byInput>;

    @Field(() => [UserScalarWhereInput], {nullable:true})
    @Type(() => UserScalarWhereInput)
    deleteMany?: Array<UserScalarWhereInput>;
}
