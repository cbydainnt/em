import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonWhereInput } from './lesson-where.input';
import { Type } from 'class-transformer';
import { LessonUpdateWithoutUser_lesson_progressInput } from './lesson-update-without-user-lesson-progress.input';

@InputType()
export class LessonUpdateToOneWithWhereWithoutUser_lesson_progressInput {

    @Field(() => LessonWhereInput, {nullable:true})
    @Type(() => LessonWhereInput)
    where?: LessonWhereInput;

    @Field(() => LessonUpdateWithoutUser_lesson_progressInput, {nullable:false})
    @Type(() => LessonUpdateWithoutUser_lesson_progressInput)
    data!: LessonUpdateWithoutUser_lesson_progressInput;
}
