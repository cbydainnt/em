import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonUpdateWithoutUser_lesson_progressInput } from './lesson-update-without-user-lesson-progress.input';
import { Type } from 'class-transformer';
import { LessonCreateWithoutUser_lesson_progressInput } from './lesson-create-without-user-lesson-progress.input';
import { LessonWhereInput } from './lesson-where.input';

@InputType()
export class LessonUpsertWithoutUser_lesson_progressInput {

    @Field(() => LessonUpdateWithoutUser_lesson_progressInput, {nullable:false})
    @Type(() => LessonUpdateWithoutUser_lesson_progressInput)
    update!: LessonUpdateWithoutUser_lesson_progressInput;

    @Field(() => LessonCreateWithoutUser_lesson_progressInput, {nullable:false})
    @Type(() => LessonCreateWithoutUser_lesson_progressInput)
    create!: LessonCreateWithoutUser_lesson_progressInput;

    @Field(() => LessonWhereInput, {nullable:true})
    @Type(() => LessonWhereInput)
    where?: LessonWhereInput;
}
