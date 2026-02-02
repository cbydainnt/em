import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateWithoutReportCommentsInput } from './user-update-without-report-comments.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutReportCommentsInput } from './user-create-without-report-comments.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutReportCommentsInput {

    @Field(() => UserUpdateWithoutReportCommentsInput, {nullable:false})
    @Type(() => UserUpdateWithoutReportCommentsInput)
    update!: UserUpdateWithoutReportCommentsInput;

    @Field(() => UserCreateWithoutReportCommentsInput, {nullable:false})
    @Type(() => UserCreateWithoutReportCommentsInput)
    create!: UserCreateWithoutReportCommentsInput;

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;
}
