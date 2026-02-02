import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonWhereInput } from './lesson-where.input';
import { Type } from 'class-transformer';
import { LessonUpdateWithoutUser_quiz_progressInput } from './lesson-update-without-user-quiz-progress.input';

@InputType()
export class LessonUpdateToOneWithWhereWithoutUser_quiz_progressInput {

    @Field(() => LessonWhereInput, {nullable:true})
    @Type(() => LessonWhereInput)
    where?: LessonWhereInput;

    @Field(() => LessonUpdateWithoutUser_quiz_progressInput, {nullable:false})
    @Type(() => LessonUpdateWithoutUser_quiz_progressInput)
    data!: LessonUpdateWithoutUser_quiz_progressInput;
}
