import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseViewWhereInput } from './course-view-where.input';

@InputType()
export class CourseViewListRelationFilter {

    @Field(() => CourseViewWhereInput, {nullable:true})
    every?: CourseViewWhereInput;

    @Field(() => CourseViewWhereInput, {nullable:true})
    some?: CourseViewWhereInput;

    @Field(() => CourseViewWhereInput, {nullable:true})
    none?: CourseViewWhereInput;
}
