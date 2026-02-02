import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ComboWhereInput } from './combo-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyComboArgs {

    @Field(() => ComboWhereInput, {nullable:true})
    @Type(() => ComboWhereInput)
    where?: ComboWhereInput;
}
