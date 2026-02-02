import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutDeleted_byInput } from './user-create-without-deleted-by.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutDeleted_byInput } from './user-create-or-connect-without-deleted-by.input';
import { UserUpsertWithWhereUniqueWithoutDeleted_byInput } from './user-upsert-with-where-unique-without-deleted-by.input';
import { UserCreateManyDeleted_byInputEnvelope } from './user-create-many-deleted-by-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateWithWhereUniqueWithoutDeleted_byInput } from './user-update-with-where-unique-without-deleted-by.input';
import { UserUpdateManyWithWhereWithoutDeleted_byInput } from './user-update-many-with-where-without-deleted-by.input';
import { UserScalarWhereInput } from './user-scalar-where.input';

@InputType()
export class UserUncheckedUpdateManyWithoutDeleted_byNestedInput {

    @Field(() => [UserCreateWithoutDeleted_byInput], {nullable:true})
    @Type(() => UserCreateWithoutDeleted_byInput)
    create?: Array<UserCreateWithoutDeleted_byInput>;

    @Field(() => [UserCreateOrConnectWithoutDeleted_byInput], {nullable:true})
    @Type(() => UserCreateOrConnectWithoutDeleted_byInput)
    connectOrCreate?: Array<UserCreateOrConnectWithoutDeleted_byInput>;

    @Field(() => [UserUpsertWithWhereUniqueWithoutDeleted_byInput], {nullable:true})
    @Type(() => UserUpsertWithWhereUniqueWithoutDeleted_byInput)
    upsert?: Array<UserUpsertWithWhereUniqueWithoutDeleted_byInput>;

    @Field(() => UserCreateManyDeleted_byInputEnvelope, {nullable:true})
    @Type(() => UserCreateManyDeleted_byInputEnvelope)
    createMany?: UserCreateManyDeleted_byInputEnvelope;

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

    @Field(() => [UserUpdateWithWhereUniqueWithoutDeleted_byInput], {nullable:true})
    @Type(() => UserUpdateWithWhereUniqueWithoutDeleted_byInput)
    update?: Array<UserUpdateWithWhereUniqueWithoutDeleted_byInput>;

    @Field(() => [UserUpdateManyWithWhereWithoutDeleted_byInput], {nullable:true})
    @Type(() => UserUpdateManyWithWhereWithoutDeleted_byInput)
    updateMany?: Array<UserUpdateManyWithWhereWithoutDeleted_byInput>;

    @Field(() => [UserScalarWhereInput], {nullable:true})
    @Type(() => UserScalarWhereInput)
    deleteMany?: Array<UserScalarWhereInput>;
}
