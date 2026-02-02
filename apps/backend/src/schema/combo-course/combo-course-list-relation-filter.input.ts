import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ComboCourseWhereInput } from './combo-course-where.input';

@InputType()
export class ComboCourseListRelationFilter {

    @Field(() => ComboCourseWhereInput, {nullable:true})
    every?: ComboCourseWhereInput;

    @Field(() => ComboCourseWhereInput, {nullable:true})
    some?: ComboCourseWhereInput;

    @Field(() => ComboCourseWhereInput, {nullable:true})
    none?: ComboCourseWhereInput;
}
