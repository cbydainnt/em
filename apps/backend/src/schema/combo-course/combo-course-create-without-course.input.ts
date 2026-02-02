import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ComboCreateNestedOneWithoutCoursesInput } from '../combo/combo-create-nested-one-without-courses.input';

@InputType()
export class ComboCourseCreateWithoutCourseInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => Boolean, {nullable:true})
    del_flg?: boolean;

    @Field(() => ComboCreateNestedOneWithoutCoursesInput, {nullable:false})
    combo!: ComboCreateNestedOneWithoutCoursesInput;
}
