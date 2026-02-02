import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ComboCourseScalarWhereInput } from './combo-course-scalar-where.input';
import { Type } from 'class-transformer';
import { ComboCourseUpdateManyMutationInput } from './combo-course-update-many-mutation.input';

@InputType()
export class ComboCourseUpdateManyWithWhereWithoutComboInput {

    @Field(() => ComboCourseScalarWhereInput, {nullable:false})
    @Type(() => ComboCourseScalarWhereInput)
    where!: ComboCourseScalarWhereInput;

    @Field(() => ComboCourseUpdateManyMutationInput, {nullable:false})
    @Type(() => ComboCourseUpdateManyMutationInput)
    data!: ComboCourseUpdateManyMutationInput;
}
