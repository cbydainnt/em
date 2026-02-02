import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ComboUpdateWithoutCoursesInput } from './combo-update-without-courses.input';
import { Type } from 'class-transformer';
import { ComboCreateWithoutCoursesInput } from './combo-create-without-courses.input';
import { ComboWhereInput } from './combo-where.input';

@InputType()
export class ComboUpsertWithoutCoursesInput {

    @Field(() => ComboUpdateWithoutCoursesInput, {nullable:false})
    @Type(() => ComboUpdateWithoutCoursesInput)
    update!: ComboUpdateWithoutCoursesInput;

    @Field(() => ComboCreateWithoutCoursesInput, {nullable:false})
    @Type(() => ComboCreateWithoutCoursesInput)
    create!: ComboCreateWithoutCoursesInput;

    @Field(() => ComboWhereInput, {nullable:true})
    @Type(() => ComboWhereInput)
    where?: ComboWhereInput;
}
