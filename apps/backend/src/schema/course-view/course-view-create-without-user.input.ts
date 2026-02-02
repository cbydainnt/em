import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateNestedOneWithoutCourse_viewInput } from '../course/course-create-nested-one-without-course-view.input';

@InputType()
export class CourseViewCreateWithoutUserInput {

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
}
