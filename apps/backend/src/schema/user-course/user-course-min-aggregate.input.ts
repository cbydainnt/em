import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UserCourseMinAggregateInput {

    @Field(() => Boolean, {nullable:true})
    id?: true;

    @Field(() => Boolean, {nullable:true})
    user_id?: true;

    @Field(() => Boolean, {nullable:true})
    course_id?: true;

    @Field(() => Boolean, {nullable:true})
    enrolled_at?: true;

    @Field(() => Boolean, {nullable:true})
    last_accessed?: true;

    @Field(() => Boolean, {nullable:true})
    status?: true;

    @Field(() => Boolean, {nullable:true})
    expired_date?: true;

    @Field(() => Boolean, {nullable:true})
    paused_at?: true;

    @Field(() => Boolean, {nullable:true})
    pause_until?: true;

    @Field(() => Boolean, {nullable:true})
    total_paused_days?: true;

    @Field(() => Boolean, {nullable:true})
    pause_count?: true;

    @Field(() => Boolean, {nullable:true})
    created_at?: true;

    @Field(() => Boolean, {nullable:true})
    del_flg?: true;
}
