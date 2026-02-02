import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonQuizWhereInput } from './lesson-quiz-where.input';

@InputType()
export class LessonQuizListRelationFilter {

    @Field(() => LessonQuizWhereInput, {nullable:true})
    every?: LessonQuizWhereInput;

    @Field(() => LessonQuizWhereInput, {nullable:true})
    some?: LessonQuizWhereInput;

    @Field(() => LessonQuizWhereInput, {nullable:true})
    none?: LessonQuizWhereInput;
}
