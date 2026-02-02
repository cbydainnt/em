import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class UserQuizProgressUser_idQuiz_idLesson_idAttemptsCompoundUniqueInput {

    @Field(() => String, {nullable:false})
    user_id!: string;

    @Field(() => String, {nullable:false})
    quiz_id!: string;

    @Field(() => String, {nullable:false})
    lesson_id!: string;

    @Field(() => Int, {nullable:false})
    attempts!: number;
}
