import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class ReportAvgAggregate {

    @Field(() => Float, {nullable:true})
    report_type?: number;

    @Field(() => Float, {nullable:true})
    category?: number;

    @Field(() => Float, {nullable:true})
    status?: number;

    @Field(() => Float, {nullable:true})
    priority?: number;
}
