import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ComboWhereUniqueInput } from './combo-where-unique.input';
import { Type } from 'class-transformer';
import { ComboCreateWithoutCoursesInput } from './combo-create-without-courses.input';

@InputType()
export class ComboCreateOrConnectWithoutCoursesInput {

    @Field(() => ComboWhereUniqueInput, {nullable:false})
    @Type(() => ComboWhereUniqueInput)
    where!: Prisma.AtLeast<ComboWhereUniqueInput, 'combo_id' | 'combo_name'>;

    @Field(() => ComboCreateWithoutCoursesInput, {nullable:false})
    @Type(() => ComboCreateWithoutCoursesInput)
    create!: ComboCreateWithoutCoursesInput;
}
