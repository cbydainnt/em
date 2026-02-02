import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class QuizCount {

    @Field(() => Int, {nullable:false})
    questions?: number;

    @Field(() => Int, {nullable:false})
    audios?: number;

    @Field(() => Int, {nullable:false})
    user_progress?: number;

    @Field(() => Int, {nullable:false})
    quiz_versions?: number;

    @Field(() => Int, {nullable:false})
    quiz_lessons?: number;
}
