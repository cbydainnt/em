import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class CourseCreateManyInput {

    @Field(() => String, {nullable:true})
    course_id?: string;

    @Field(() => String, {nullable:false})
    course_name!: string;

    @Field(() => String, {nullable:false})
    course_description!: string;

    @Field(() => Int, {nullable:false})
    course_price!: number;

    @Field(() => Int, {nullable:false})
    course_original_price!: number;

    @Field(() => String, {nullable:false})
    state!: string;

    @Field(() => String, {nullable:true})
    target?: string;

    @Field(() => String, {nullable:true})
    thumbnail?: string;

    @Field(() => Int, {nullable:true})
    access_duration_months?: number;

    @Field(() => Int, {nullable:true})
    access_type?: number;

    @Field(() => Date, {nullable:true})
    access_expire_at?: Date | string;

    @Field(() => Int, {nullable:true})
    view_count?: number;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;

    @Field(() => String, {nullable:true})
    created_by?: string;

    @Field(() => String, {nullable:true})
    updated_by?: string;

    @Field(() => Boolean, {nullable:true})
    del_flg?: boolean;
}
