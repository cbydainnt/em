import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class MSystemAvgAggregate {

    @Field(() => Float, {nullable:true})
    sort?: number;

    @Field(() => Float, {nullable:true})
    del_flg?: number;
}
