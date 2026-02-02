import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ComboWhereInput } from './combo-where.input';
import { Type } from 'class-transformer';
import { ComboUpdateWithoutCoursesInput } from './combo-update-without-courses.input';

@InputType()
export class ComboUpdateToOneWithWhereWithoutCoursesInput {

    @Field(() => ComboWhereInput, {nullable:true})
    @Type(() => ComboWhereInput)
    where?: ComboWhereInput;

    @Field(() => ComboUpdateWithoutCoursesInput, {nullable:false})
    @Type(() => ComboUpdateWithoutCoursesInput)
    data!: ComboUpdateWithoutCoursesInput;
}
