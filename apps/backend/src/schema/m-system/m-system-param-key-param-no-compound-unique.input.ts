import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class MSystemParam_keyParam_noCompoundUniqueInput {

    @Field(() => String, {nullable:false})
    param_key!: string;

    @Field(() => String, {nullable:false})
    param_no!: string;
}
