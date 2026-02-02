import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateManyDeleted_byInput } from './user-create-many-deleted-by.input';
import { Type } from 'class-transformer';

@InputType()
export class UserCreateManyDeleted_byInputEnvelope {

    @Field(() => [UserCreateManyDeleted_byInput], {nullable:false})
    @Type(() => UserCreateManyDeleted_byInput)
    data!: Array<UserCreateManyDeleted_byInput>;
}
