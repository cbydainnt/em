import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Course } from '../course/course.model';
import { Lesson } from '../lesson/lesson.model';
import { SectionCount } from './section-count.output';

@ObjectType()
export class Section {

    @Field(() => ID, {nullable:false})
    section_id!: string;

    @Field(() => String, {nullable:false})
    section_title!: string;

    @Field(() => Date, {nullable:false})
    created_at!: Date;

    @Field(() => Date, {nullable:false})
    updated_at!: Date;

    @Field(() => String, {nullable:true})
    created_by!: string | null;

    @Field(() => String, {nullable:true})
    updated_by!: string | null;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    del_flg!: boolean;

    @Field(() => String, {nullable:false})
    course_id!: string;

    @Field(() => Course, {nullable:false})
    course?: Course;

    @Field(() => [Lesson], {nullable:true})
    lessons?: Array<Lesson>;

    @Field(() => SectionCount, {nullable:false})
    _count?: SectionCount;
}
