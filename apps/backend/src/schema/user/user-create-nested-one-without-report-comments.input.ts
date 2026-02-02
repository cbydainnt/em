import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutReportCommentsInput } from './user-create-without-report-comments.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutReportCommentsInput } from './user-create-or-connect-without-report-comments.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutReportCommentsInput {

    @Field(() => UserCreateWithoutReportCommentsInput, {nullable:true})
    @Type(() => UserCreateWithoutReportCommentsInput)
    create?: UserCreateWithoutReportCommentsInput;

    @Field(() => UserCreateOrConnectWithoutReportCommentsInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutReportCommentsInput)
    connectOrCreate?: UserCreateOrConnectWithoutReportCommentsInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;
}
