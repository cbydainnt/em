import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';

@InputType()
export class ComboCourseScalarWhereInput {

    @Field(() => [ComboCourseScalarWhereInput], {nullable:true})
    AND?: Array<ComboCourseScalarWhereInput>;

    @Field(() => [ComboCourseScalarWhereInput], {nullable:true})
    OR?: Array<ComboCourseScalarWhereInput>;

    @Field(() => [ComboCourseScalarWhereInput], {nullable:true})
    NOT?: Array<ComboCourseScalarWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    combo_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    course_id?: StringFilter;

    @Field(() => BoolFilter, {nullable:true})
    del_flg?: BoolFilter;
}
