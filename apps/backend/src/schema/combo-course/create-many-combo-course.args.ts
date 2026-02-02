import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ComboCourseCreateManyInput } from './combo-course-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyComboCourseArgs {

    @Field(() => [ComboCourseCreateManyInput], {nullable:false})
    @Type(() => ComboCourseCreateManyInput)
    data!: Array<ComboCourseCreateManyInput>;
}
