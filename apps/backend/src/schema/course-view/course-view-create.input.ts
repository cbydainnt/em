import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateNestedOneWithoutCourse_viewInput } from '../course/course-create-nested-one-without-course-view.input';
import { UserCreateNestedOneWithoutCourse_viewInput } from '../user/user-create-nested-one-without-course-view.input';

@InputType()
export class CourseViewCreateInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:true})
    ip_address?: string;

    @Field(() => String, {nullable:true})
    user_agent?: string;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => CourseCreateNestedOneWithoutCourse_viewInput, {nullable:false})
    course!: CourseCreateNestedOneWithoutCourse_viewInput;

    @Field(() => UserCreateNestedOneWithoutCourse_viewInput, {nullable:true})
    user?: UserCreateNestedOneWithoutCourse_viewInput;
}
