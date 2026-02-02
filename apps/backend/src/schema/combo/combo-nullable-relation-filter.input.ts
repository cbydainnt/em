import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ComboWhereInput } from './combo-where.input';

@InputType()
export class ComboNullableRelationFilter {

    @Field(() => ComboWhereInput, {nullable:true})
    is?: ComboWhereInput;

    @Field(() => ComboWhereInput, {nullable:true})
    isNot?: ComboWhereInput;
}
