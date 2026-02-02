import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class DiscountVoucherItemUncheckedCreateWithoutVoucherInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:true})
    course_id?: string;

    @Field(() => String, {nullable:true})
    combo_id?: string;
}
