import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MSystemParam_keyParam_noCompoundUniqueInput } from './m-system-param-key-param-no-compound-unique.input';
import { MSystemWhereInput } from './m-system-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';

@InputType()
export class MSystemWhereUniqueInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => MSystemParam_keyParam_noCompoundUniqueInput, {nullable:true})
    param_key_param_no?: MSystemParam_keyParam_noCompoundUniqueInput;

    @Field(() => [MSystemWhereInput], {nullable:true})
    AND?: Array<MSystemWhereInput>;

    @Field(() => [MSystemWhereInput], {nullable:true})
    OR?: Array<MSystemWhereInput>;

    @Field(() => [MSystemWhereInput], {nullable:true})
    NOT?: Array<MSystemWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    param_key?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    param_no?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    param_name?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    param_value?: StringFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    sort?: IntNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    category?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    created_by?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    updated_by?: StringNullableFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    create_at?: DateTimeNullableFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    updated_at?: DateTimeNullableFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    del_flg?: IntNullableFilter;
}
