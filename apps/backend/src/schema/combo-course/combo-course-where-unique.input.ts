import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ComboCourseCombo_idCourse_idCompoundUniqueInput } from './combo-course-combo-id-course-id-compound-unique.input';
import { ComboCourseWhereInput } from './combo-course-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { ComboRelationFilter } from '../combo/combo-relation-filter.input';
import { CourseRelationFilter } from '../course/course-relation-filter.input';

@InputType()
export class ComboCourseWhereUniqueInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => ComboCourseCombo_idCourse_idCompoundUniqueInput, {nullable:true})
    combo_id_course_id?: ComboCourseCombo_idCourse_idCompoundUniqueInput;

    @Field(() => [ComboCourseWhereInput], {nullable:true})
    AND?: Array<ComboCourseWhereInput>;

    @Field(() => [ComboCourseWhereInput], {nullable:true})
    OR?: Array<ComboCourseWhereInput>;

    @Field(() => [ComboCourseWhereInput], {nullable:true})
    NOT?: Array<ComboCourseWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    combo_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    course_id?: StringFilter;

    @Field(() => BoolFilter, {nullable:true})
    del_flg?: BoolFilter;

    @Field(() => ComboRelationFilter, {nullable:true})
    combo?: ComboRelationFilter;

    @Field(() => CourseRelationFilter, {nullable:true})
    course?: CourseRelationFilter;
}
