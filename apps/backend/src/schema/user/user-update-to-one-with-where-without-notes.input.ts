import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutNotesInput } from './user-update-without-notes.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutNotesInput {

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;

    @Field(() => UserUpdateWithoutNotesInput, {nullable:false})
    @Type(() => UserUpdateWithoutNotesInput)
    data!: UserUpdateWithoutNotesInput;
}
