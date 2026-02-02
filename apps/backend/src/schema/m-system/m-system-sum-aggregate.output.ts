import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class MSystemSumAggregate {

    @Field(() => Int, {nullable:true})
    sort?: number;

    @Field(() => Int, {nullable:true})
    del_flg?: number;
}
