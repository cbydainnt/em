import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class NoteSumAggregateInput {

    @Field(() => Boolean, {nullable:true})
    timestamp?: true;
}
