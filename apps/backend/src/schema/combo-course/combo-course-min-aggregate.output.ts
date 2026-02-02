import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ComboCourseMinAggregate {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:true})
    combo_id?: string;

    @Field(() => String, {nullable:true})
    course_id?: string;

    @Field(() => Boolean, {nullable:true})
    del_flg?: boolean;
}
