import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ComboCourseUncheckedCreateWithoutComboInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    course_id!: string;

    @Field(() => Boolean, {nullable:true})
    del_flg?: boolean;
}
