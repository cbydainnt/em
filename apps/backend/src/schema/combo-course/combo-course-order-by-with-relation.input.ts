import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { ComboOrderByWithRelationInput } from '../combo/combo-order-by-with-relation.input';
import { CourseOrderByWithRelationInput } from '../course/course-order-by-with-relation.input';

@InputType()
export class ComboCourseOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    combo_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    del_flg?: keyof typeof SortOrder;

    @Field(() => ComboOrderByWithRelationInput, {nullable:true})
    combo?: ComboOrderByWithRelationInput;

    @Field(() => CourseOrderByWithRelationInput, {nullable:true})
    course?: CourseOrderByWithRelationInput;
}
