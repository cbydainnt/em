import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonWhereInput } from './lesson-where.input';
import { Type } from 'class-transformer';
import { LessonUpdateWithoutQuizzesInput } from './lesson-update-without-quizzes.input';

@InputType()
export class LessonUpdateToOneWithWhereWithoutQuizzesInput {

    @Field(() => LessonWhereInput, {nullable:true})
    @Type(() => LessonWhereInput)
    where?: LessonWhereInput;

    @Field(() => LessonUpdateWithoutQuizzesInput, {nullable:false})
    @Type(() => LessonUpdateWithoutQuizzesInput)
    data!: LessonUpdateWithoutQuizzesInput;
}
