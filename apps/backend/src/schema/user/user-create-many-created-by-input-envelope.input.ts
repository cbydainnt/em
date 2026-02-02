import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateManyCreated_byInput } from './user-create-many-created-by.input';
import { Type } from 'class-transformer';

@InputType()
export class UserCreateManyCreated_byInputEnvelope {

    @Field(() => [UserCreateManyCreated_byInput], {nullable:false})
    @Type(() => UserCreateManyCreated_byInput)
    data!: Array<UserCreateManyCreated_byInput>;
}
