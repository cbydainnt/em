import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutReportCommentsInput } from './user-create-without-report-comments.input';

@InputType()
export class UserCreateOrConnectWithoutReportCommentsInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserCreateWithoutReportCommentsInput, {nullable:false})
    @Type(() => UserCreateWithoutReportCommentsInput)
    create!: UserCreateWithoutReportCommentsInput;
}
