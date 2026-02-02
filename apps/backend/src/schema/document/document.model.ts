import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Lesson } from '../lesson/lesson.model';

@ObjectType()
export class Document {

    @Field(() => ID, {nullable:false})
    document_id!: string;

    @Field(() => String, {nullable:false})
    document_url!: string;

    @Field(() => String, {nullable:false})
    extension!: string;

    @Field(() => String, {nullable:false})
    document_name!: string;

    @Field(() => Int, {nullable:false,defaultValue:0})
    size!: number;

    @Field(() => Boolean, {nullable:false,defaultValue:true})
    isDownloadable!: boolean;

    @Field(() => Date, {nullable:false})
    created_at!: Date;

    @Field(() => Date, {nullable:false})
    updated_at!: Date;

    @Field(() => String, {nullable:false})
    lesson_id!: string;

    @Field(() => Lesson, {nullable:false})
    lesson?: Lesson;
}
