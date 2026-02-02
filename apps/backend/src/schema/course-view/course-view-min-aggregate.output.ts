import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CourseViewMinAggregate {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:true})
    course_id?: string;

    @Field(() => String, {nullable:true})
    user_id?: string;

    @Field(() => String, {nullable:true})
    ip_address?: string;

    @Field(() => String, {nullable:true})
    user_agent?: string;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;
}
