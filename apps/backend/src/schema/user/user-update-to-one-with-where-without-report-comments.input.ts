import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutReportCommentsInput } from './user-update-without-report-comments.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutReportCommentsInput {

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;

    @Field(() => UserUpdateWithoutReportCommentsInput, {nullable:false})
    @Type(() => UserUpdateWithoutReportCommentsInput)
    data!: UserUpdateWithoutReportCommentsInput;
}
