import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonWhereInput } from './lesson-where.input';

@InputType()
export class LessonListRelationFilter {

    @Field(() => LessonWhereInput, {nullable:true})
    every?: LessonWhereInput;

    @Field(() => LessonWhereInput, {nullable:true})
    some?: LessonWhereInput;

    @Field(() => LessonWhereInput, {nullable:true})
    none?: LessonWhereInput;
}
