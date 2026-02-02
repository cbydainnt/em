import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { Lesson } from '../lesson/lesson.model';

@ObjectType()
export class Note {

    @Field(() => ID, {nullable:false})
    note_id!: string;

    @Field(() => String, {nullable:false})
    content!: string;

    @Field(() => Int, {nullable:false})
    timestamp!: number;

    @Field(() => Date, {nullable:false})
    created_at!: Date;

    @Field(() => Date, {nullable:false})
    updated_at!: Date;

    @Field(() => String, {nullable:false})
    user_id!: string;

    @Field(() => String, {nullable:false})
    lesson_id!: string;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    del_flg!: boolean;

    @Field(() => String, {nullable:true})
    background_color!: string | null;

    @Field(() => User, {nullable:false})
    user?: User;

    @Field(() => Lesson, {nullable:false})
    lesson?: Lesson;
}
