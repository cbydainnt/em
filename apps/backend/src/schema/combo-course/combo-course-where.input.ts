import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { ComboRelationFilter } from '../combo/combo-relation-filter.input';
import { CourseRelationFilter } from '../course/course-relation-filter.input';

@InputType()
export class ComboCourseWhereInput {

    @Field(() => [ComboCourseWhereInput], {nullable:true})
    AND?: Array<ComboCourseWhereInput>;

    @Field(() => [ComboCourseWhereInput], {nullable:true})
    OR?: Array<ComboCourseWhereInput>;

    @Field(() => [ComboCourseWhereInput], {nullable:true})
    NOT?: Array<ComboCourseWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

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
