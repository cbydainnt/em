import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ComboCourseUpdateManyMutationInput } from './combo-course-update-many-mutation.input';
import { Type } from 'class-transformer';
import { ComboCourseWhereInput } from './combo-course-where.input';

@ArgsType()
export class UpdateManyComboCourseArgs {

    @Field(() => ComboCourseUpdateManyMutationInput, {nullable:false})
    @Type(() => ComboCourseUpdateManyMutationInput)
    data!: ComboCourseUpdateManyMutationInput;

    @Field(() => ComboCourseWhereInput, {nullable:true})
    @Type(() => ComboCourseWhereInput)
    where?: ComboCourseWhereInput;
}
