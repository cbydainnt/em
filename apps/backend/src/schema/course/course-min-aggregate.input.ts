import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CourseMinAggregateInput {

    @Field(() => Boolean, {nullable:true})
    course_id?: true;

    @Field(() => Boolean, {nullable:true})
    course_name?: true;

    @Field(() => Boolean, {nullable:true})
    course_description?: true;

    @Field(() => Boolean, {nullable:true})
    course_price?: true;

    @Field(() => Boolean, {nullable:true})
    course_original_price?: true;

    @Field(() => Boolean, {nullable:true})
    state?: true;

    @Field(() => Boolean, {nullable:true})
    target?: true;

    @Field(() => Boolean, {nullable:true})
    thumbnail?: true;

    @Field(() => Boolean, {nullable:true})
    access_duration_months?: true;

    @Field(() => Boolean, {nullable:true})
    access_type?: true;

    @Field(() => Boolean, {nullable:true})
    access_expire_at?: true;

    @Field(() => Boolean, {nullable:true})
    view_count?: true;

    @Field(() => Boolean, {nullable:true})
    created_at?: true;

    @Field(() => Boolean, {nullable:true})
    updated_at?: true;

    @Field(() => Boolean, {nullable:true})
    created_by?: true;

    @Field(() => Boolean, {nullable:true})
    updated_by?: true;

    @Field(() => Boolean, {nullable:true})
    del_flg?: true;
}
