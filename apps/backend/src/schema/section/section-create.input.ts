import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateNestedOneWithoutSectionsInput } from '../course/course-create-nested-one-without-sections.input';
import { LessonCreateNestedManyWithoutSectionInput } from '../lesson/lesson-create-nested-many-without-section.input';

@InputType()
export class SectionCreateInput {

    @Field(() => String, {nullable:true})
    section_id?: string;

    @Field(() => String, {nullable:false})
    section_title!: string;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;

    @Field(() => String, {nullable:true})
    created_by?: string;

    @Field(() => String, {nullable:true})
    updated_by?: string;

    @Field(() => Boolean, {nullable:true})
    del_flg?: boolean;

    @Field(() => CourseCreateNestedOneWithoutSectionsInput, {nullable:false})
    course!: CourseCreateNestedOneWithoutSectionsInput;

    @Field(() => LessonCreateNestedManyWithoutSectionInput, {nullable:true})
    lessons?: LessonCreateNestedManyWithoutSectionInput;
}
