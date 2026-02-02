import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonUpdateWithoutLesson_quizzesInput } from './lesson-update-without-lesson-quizzes.input';
import { Type } from 'class-transformer';
import { LessonCreateWithoutLesson_quizzesInput } from './lesson-create-without-lesson-quizzes.input';
import { LessonWhereInput } from './lesson-where.input';

@InputType()
export class LessonUpsertWithoutLesson_quizzesInput {

    @Field(() => LessonUpdateWithoutLesson_quizzesInput, {nullable:false})
    @Type(() => LessonUpdateWithoutLesson_quizzesInput)
    update!: LessonUpdateWithoutLesson_quizzesInput;

    @Field(() => LessonCreateWithoutLesson_quizzesInput, {nullable:false})
    @Type(() => LessonCreateWithoutLesson_quizzesInput)
    create!: LessonCreateWithoutLesson_quizzesInput;

    @Field(() => LessonWhereInput, {nullable:true})
    @Type(() => LessonWhereInput)
    where?: LessonWhereInput;
}
