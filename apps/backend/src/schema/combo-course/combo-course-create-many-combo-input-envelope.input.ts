import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ComboCourseCreateManyComboInput } from './combo-course-create-many-combo.input';
import { Type } from 'class-transformer';

@InputType()
export class ComboCourseCreateManyComboInputEnvelope {

    @Field(() => [ComboCourseCreateManyComboInput], {nullable:false})
    @Type(() => ComboCourseCreateManyComboInput)
    data!: Array<ComboCourseCreateManyComboInput>;
}
