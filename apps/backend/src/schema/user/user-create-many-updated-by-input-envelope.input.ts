import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateManyUpdated_byInput } from './user-create-many-updated-by.input';
import { Type } from 'class-transformer';

@InputType()
export class UserCreateManyUpdated_byInputEnvelope {

    @Field(() => [UserCreateManyUpdated_byInput], {nullable:false})
    @Type(() => UserCreateManyUpdated_byInput)
    data!: Array<UserCreateManyUpdated_byInput>;
}
