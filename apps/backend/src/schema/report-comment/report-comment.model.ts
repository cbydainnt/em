import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Report } from '../report/report.model';
import { User } from '../user/user.model';

@ObjectType()
export class ReportComment {

    @Field(() => ID, {nullable:false})
    comment_id!: string;

    @Field(() => String, {nullable:false})
    report_id!: string;

    @Field(() => String, {nullable:true})
    user_id!: string | null;

    @Field(() => String, {nullable:false})
    content!: string;

    @Field(() => Date, {nullable:false})
    created_at!: Date;

    @Field(() => Report, {nullable:false})
    report?: Report;

    @Field(() => User, {nullable:true})
    user?: User | null;
}
