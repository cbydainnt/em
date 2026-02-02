import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateNestedOneWithoutCombosInput } from '../course/course-create-nested-one-without-combos.input';

@InputType()
export class ComboCourseCreateWithoutComboInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => Boolean, {nullable:true})
    del_flg?: boolean;

    @Field(() => CourseCreateNestedOneWithoutCombosInput, {nullable:false})
    course!: CourseCreateNestedOneWithoutCombosInput;
}
