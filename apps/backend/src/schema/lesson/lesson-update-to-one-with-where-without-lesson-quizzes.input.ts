import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonWhereInput } from './lesson-where.input';
import { Type } from 'class-transformer';
import { LessonUpdateWithoutLesson_quizzesInput } from './lesson-update-without-lesson-quizzes.input';

@InputType()
export class LessonUpdateToOneWithWhereWithoutLesson_quizzesInput {

    @Field(() => LessonWhereInput, {nullable:true})
    @Type(() => LessonWhereInput)
    where?: LessonWhereInput;

    @Field(() => LessonUpdateWithoutLesson_quizzesInput, {nullable:false})
    @Type(() => LessonUpdateWithoutLesson_quizzesInput)
    data!: LessonUpdateWithoutLesson_quizzesInput;
}
