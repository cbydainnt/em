import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserNotificationScalarWhereInput } from './user-notification-scalar-where.input';
import { Type } from 'class-transformer';
import { UserNotificationUpdateManyMutationInput } from './user-notification-update-many-mutation.input';

@InputType()
export class UserNotificationUpdateManyWithWhereWithoutNotificationInput {

    @Field(() => UserNotificationScalarWhereInput, {nullable:false})
    @Type(() => UserNotificationScalarWhereInput)
    where!: UserNotificationScalarWhereInput;

    @Field(() => UserNotificationUpdateManyMutationInput, {nullable:false})
    @Type(() => UserNotificationUpdateManyMutationInput)
    data!: UserNotificationUpdateManyMutationInput;
}
