import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class UserLessonProgressUncheckedCreateWithoutCourseInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    user_id!: string;

    @Field(() => String, {nullable:false})
    lesson_id!: string;

    @Field(() => Int, {nullable:true})
    watched_seconds?: number;

    @Field(() => Int, {nullable:true})
    completed?: number;

    @Field(() => Date, {nullable:true})
    last_accessed?: Date | string;

    @Field(() => GraphQLJSON, {nullable:true})
    segments?: any;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;
}
