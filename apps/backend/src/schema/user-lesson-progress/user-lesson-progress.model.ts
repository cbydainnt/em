import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { User } from '../user/user.model';
import { Lesson } from '../lesson/lesson.model';
import { Course } from '../course/course.model';

@ObjectType()
export class UserLessonProgress {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    user_id!: string;

    @Field(() => String, {nullable:false})
    course_id!: string;

    @Field(() => String, {nullable:false})
    lesson_id!: string;

    @Field(() => Int, {nullable:false,defaultValue:0})
    watched_seconds!: number;

    @Field(() => Int, {nullable:false,defaultValue:1})
    completed!: number;

    @Field(() => Date, {nullable:true})
    last_accessed!: Date | null;

    @Field(() => GraphQLJSON, {nullable:true})
    segments!: any | null;

    @Field(() => Date, {nullable:false})
    created_at!: Date;

    @Field(() => Date, {nullable:false})
    updated_at!: Date;

    @Field(() => User, {nullable:false})
    user?: User;

    @Field(() => Lesson, {nullable:false})
    lesson?: Lesson;

    @Field(() => Course, {nullable:false})
    course?: Course;
}
