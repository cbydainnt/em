import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class DocumentSumAggregateInput {

    @Field(() => Boolean, {nullable:true})
    size?: true;
}
