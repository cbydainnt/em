import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ComboCreateNestedOneWithoutCoursesInput } from '../combo/combo-create-nested-one-without-courses.input';
import { CourseCreateNestedOneWithoutCombosInput } from '../course/course-create-nested-one-without-combos.input';

@InputType()
export class ComboCourseCreateInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => Boolean, {nullable:true})
    del_flg?: boolean;

    @Field(() => ComboCreateNestedOneWithoutCoursesInput, {nullable:false})
    combo!: ComboCreateNestedOneWithoutCoursesInput;

    @Field(() => CourseCreateNestedOneWithoutCombosInput, {nullable:false})
    course!: CourseCreateNestedOneWithoutCombosInput;
}
