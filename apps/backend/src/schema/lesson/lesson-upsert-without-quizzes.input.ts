import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonUpdateWithoutQuizzesInput } from './lesson-update-without-quizzes.input';
import { Type } from 'class-transformer';
import { LessonCreateWithoutQuizzesInput } from './lesson-create-without-quizzes.input';
import { LessonWhereInput } from './lesson-where.input';

@InputType()
export class LessonUpsertWithoutQuizzesInput {

    @Field(() => LessonUpdateWithoutQuizzesInput, {nullable:false})
    @Type(() => LessonUpdateWithoutQuizzesInput)
    update!: LessonUpdateWithoutQuizzesInput;

    @Field(() => LessonCreateWithoutQuizzesInput, {nullable:false})
    @Type(() => LessonCreateWithoutQuizzesInput)
    create!: LessonCreateWithoutQuizzesInput;

    @Field(() => LessonWhereInput, {nullable:true})
    @Type(() => LessonWhereInput)
    where?: LessonWhereInput;
}
