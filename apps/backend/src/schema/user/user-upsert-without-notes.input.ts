import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateWithoutNotesInput } from './user-update-without-notes.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutNotesInput } from './user-create-without-notes.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutNotesInput {

    @Field(() => UserUpdateWithoutNotesInput, {nullable:false})
    @Type(() => UserUpdateWithoutNotesInput)
    update!: UserUpdateWithoutNotesInput;

    @Field(() => UserCreateWithoutNotesInput, {nullable:false})
    @Type(() => UserCreateWithoutNotesInput)
    create!: UserCreateWithoutNotesInput;

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;
}
