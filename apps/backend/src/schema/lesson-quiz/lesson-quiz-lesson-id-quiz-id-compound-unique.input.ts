import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class LessonQuizLesson_idQuiz_idCompoundUniqueInput {

    @Field(() => String, {nullable:false})
    lesson_id!: string;

    @Field(() => String, {nullable:false})
    quiz_id!: string;
}
