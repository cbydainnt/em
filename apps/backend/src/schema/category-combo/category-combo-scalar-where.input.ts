import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class CategoryComboScalarWhereInput {

    @Field(() => [CategoryComboScalarWhereInput], {nullable:true})
    AND?: Array<CategoryComboScalarWhereInput>;

    @Field(() => [CategoryComboScalarWhereInput], {nullable:true})
    OR?: Array<CategoryComboScalarWhereInput>;

    @Field(() => [CategoryComboScalarWhereInput], {nullable:true})
    NOT?: Array<CategoryComboScalarWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    category_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    combo_id?: StringFilter;
}
