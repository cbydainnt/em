import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ComboCourseCreateManyCourseInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    combo_id!: string;

    @Field(() => Boolean, {nullable:true})
    del_flg?: boolean;
}
