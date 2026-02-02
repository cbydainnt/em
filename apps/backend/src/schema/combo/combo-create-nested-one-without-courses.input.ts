import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ComboCreateWithoutCoursesInput } from './combo-create-without-courses.input';
import { Type } from 'class-transformer';
import { ComboCreateOrConnectWithoutCoursesInput } from './combo-create-or-connect-without-courses.input';
import { Prisma } from '@prisma/client';
import { ComboWhereUniqueInput } from './combo-where-unique.input';

@InputType()
export class ComboCreateNestedOneWithoutCoursesInput {

    @Field(() => ComboCreateWithoutCoursesInput, {nullable:true})
    @Type(() => ComboCreateWithoutCoursesInput)
    create?: ComboCreateWithoutCoursesInput;

    @Field(() => ComboCreateOrConnectWithoutCoursesInput, {nullable:true})
    @Type(() => ComboCreateOrConnectWithoutCoursesInput)
    connectOrCreate?: ComboCreateOrConnectWithoutCoursesInput;

    @Field(() => ComboWhereUniqueInput, {nullable:true})
    @Type(() => ComboWhereUniqueInput)
    connect?: Prisma.AtLeast<ComboWhereUniqueInput, 'combo_id' | 'combo_name'>;
}
