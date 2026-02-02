import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Combo } from '../combo/combo.model';
import { Course } from '../course/course.model';

@ObjectType()
export class ComboCourse {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    combo_id!: string;

    @Field(() => String, {nullable:false})
    course_id!: string;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    del_flg!: boolean;

    @Field(() => Combo, {nullable:false})
    combo?: Combo;

    @Field(() => Course, {nullable:false})
    course?: Course;
}
