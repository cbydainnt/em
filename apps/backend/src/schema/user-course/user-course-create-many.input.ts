import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class UserCourseCreateManyInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    user_id!: string;

    @Field(() => String, {nullable:false})
    course_id!: string;

    @Field(() => Date, {nullable:true})
    enrolled_at?: Date | string;

    @Field(() => Date, {nullable:true})
    last_accessed?: Date | string;

    @Field(() => Int, {nullable:true})
    status?: number;

    @Field(() => Date, {nullable:true})
    expired_date?: Date | string;

    @Field(() => Date, {nullable:true})
    paused_at?: Date | string;

    @Field(() => Date, {nullable:true})
    pause_until?: Date | string;

    @Field(() => Int, {nullable:true})
    total_paused_days?: number;

    @Field(() => Int, {nullable:true})
    pause_count?: number;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Boolean, {nullable:true})
    del_flg?: boolean;
}
