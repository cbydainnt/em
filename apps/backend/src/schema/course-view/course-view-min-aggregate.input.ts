import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CourseViewMinAggregateInput {

    @Field(() => Boolean, {nullable:true})
    id?: true;

    @Field(() => Boolean, {nullable:true})
    course_id?: true;

    @Field(() => Boolean, {nullable:true})
    user_id?: true;

    @Field(() => Boolean, {nullable:true})
    ip_address?: true;

    @Field(() => Boolean, {nullable:true})
    user_agent?: true;

    @Field(() => Boolean, {nullable:true})
    created_at?: true;
}
