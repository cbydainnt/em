import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonUpdateWithoutUser_quiz_progressInput } from './lesson-update-without-user-quiz-progress.input';
import { Type } from 'class-transformer';
import { LessonCreateWithoutUser_quiz_progressInput } from './lesson-create-without-user-quiz-progress.input';
import { LessonWhereInput } from './lesson-where.input';

@InputType()
export class LessonUpsertWithoutUser_quiz_progressInput {

    @Field(() => LessonUpdateWithoutUser_quiz_progressInput, {nullable:false})
    @Type(() => LessonUpdateWithoutUser_quiz_progressInput)
    update!: LessonUpdateWithoutUser_quiz_progressInput;

    @Field(() => LessonCreateWithoutUser_quiz_progressInput, {nullable:false})
    @Type(() => LessonCreateWithoutUser_quiz_progressInput)
    create!: LessonCreateWithoutUser_quiz_progressInput;

    @Field(() => LessonWhereInput, {nullable:true})
    @Type(() => LessonWhereInput)
    where?: LessonWhereInput;
}
