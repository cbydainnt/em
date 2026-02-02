import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateNestedOneWithoutCourse_viewInput } from '../user/user-create-nested-one-without-course-view.input';

@InputType()
export class CourseViewCreateWithoutCourseInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:true})
    ip_address?: string;

    @Field(() => String, {nullable:true})
    user_agent?: string;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => UserCreateNestedOneWithoutCourse_viewInput, {nullable:true})
    user?: UserCreateNestedOneWithoutCourse_viewInput;
}
