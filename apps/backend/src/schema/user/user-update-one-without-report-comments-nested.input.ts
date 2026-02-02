import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutReportCommentsInput } from './user-create-without-report-comments.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutReportCommentsInput } from './user-create-or-connect-without-report-comments.input';
import { UserUpsertWithoutReportCommentsInput } from './user-upsert-without-report-comments.input';
import { UserWhereInput } from './user-where.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateToOneWithWhereWithoutReportCommentsInput } from './user-update-to-one-with-where-without-report-comments.input';

@InputType()
export class UserUpdateOneWithoutReportCommentsNestedInput {

    @Field(() => UserCreateWithoutReportCommentsInput, {nullable:true})
    @Type(() => UserCreateWithoutReportCommentsInput)
    create?: UserCreateWithoutReportCommentsInput;

    @Field(() => UserCreateOrConnectWithoutReportCommentsInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutReportCommentsInput)
    connectOrCreate?: UserCreateOrConnectWithoutReportCommentsInput;

    @Field(() => UserUpsertWithoutReportCommentsInput, {nullable:true})
    @Type(() => UserUpsertWithoutReportCommentsInput)
    upsert?: UserUpsertWithoutReportCommentsInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    delete?: UserWhereInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserUpdateToOneWithWhereWithoutReportCommentsInput, {nullable:true})
    @Type(() => UserUpdateToOneWithWhereWithoutReportCommentsInput)
    update?: UserUpdateToOneWithWhereWithoutReportCommentsInput;
}
