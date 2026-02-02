import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { LessonOrderByWithRelationInput } from '../lesson/lesson-order-by-with-relation.input';
import { QuizOrderByWithRelationInput } from '../quiz/quiz-order-by-with-relation.input';

@InputType()
export class LessonQuizOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    lesson_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    quiz_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    order?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => LessonOrderByWithRelationInput, {nullable:true})
    lesson?: LessonOrderByWithRelationInput;

    @Field(() => QuizOrderByWithRelationInput, {nullable:true})
    quiz?: QuizOrderByWithRelationInput;
}
