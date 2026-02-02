import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { User as UserDocument } from '@prisma/client';
import { FilterUserInput } from './dto/filters-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from '@/schema/user/user.model';
import { GqlAuthGuard } from '../auth/login/graphql/gql-auth.guard';
import { CurrentUser } from '../auth/login/graphql/gql-auth.decorator';
import { GqlAuthAdminGuard } from '../auth/login/graphql/gql-auth-admin.guard';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, { name: 'createUser', nullable: true })
  // @UseGuards(GqlAuthAdminGuard)
  @UseGuards(GqlAuthGuard)
  async create(@CurrentUser() user: User, @Args('payload') payload: CreateUserInput) {
    return await this.userService.create(payload, user.id);
  }

  @Mutation(() => User, { name: 'updateUser', nullable: true })
  // @UseGuards(GqlAuthAdminGuard)
  @UseGuards(GqlAuthGuard)
  async update(@CurrentUser() user: User, @Args('payload') payload: UpdateUserInput) {
    return await this.userService.update(payload, user.id);
  }

  @Mutation(() => User, { name: 'changePasswordAdmin', nullable: true })
  // @UseGuards(GqlAuthAdminGuard)
  @UseGuards(GqlAuthGuard)
  async changePasswordAdmin(@CurrentUser() user: User, @Args('currentPassword') currentPassword: string, @Args('newPassword') newPassword: string) {
    return await this.userService.changePassword(user.id, currentPassword, newPassword);
  }

  @Mutation(() => User, { name: 'changePassword', nullable: true })
  @UseGuards(GqlAuthGuard)
  async changePassword(@CurrentUser() user: User, @Args('currentPassword') currentPassword: string, @Args('newPassword') newPassword: string) {
    return await this.userService.changePassword(user.id, currentPassword, newPassword);
  }

  @Mutation(() => User, { name: 'updateUserType', nullable: true })
  @UseGuards(GqlAuthAdminGuard) 
  @UseGuards(GqlAuthGuard)
  async updateUserType(@CurrentUser() user: User, @Args('id') id: string, @Args('type') type: string) {
    return await this.userService.updateUserType(id, type, user.id);
  }

  @Mutation(() => Boolean, { name: 'removeUser', nullable: true })
  // @UseGuards(GqlAuthAdminGuard)
  @UseGuards(GqlAuthGuard)
  async remove(@Args('ids', { type: () => [String] }) ids: string[]) {
    return await this.userService.remove(ids);
  }

  @Query(() => Int, { name: 'countUser', nullable: true })
  // @UseGuards(GqlAuthAdminGuard)
  @UseGuards(GqlAuthGuard)
  async count(@CurrentUser() user: User, @Args('filters') filters: FilterUserInput) {
    return await this.userService.count(filters);
  }

  @Query(() => [User], { name: 'users', nullable: true })
  // @UseGuards(GqlAuthAdminGuard)
  @UseGuards(GqlAuthGuard)
  async findAll(@CurrentUser() user: User, @Args('filters') filters: FilterUserInput) {
    return await this.userService.findAll(filters);
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: UserDocument) {
    return this.userService.findOne(user.id);
  }

  @Query(() => User)
  // @UseGuards(GqlAuthAdminGuard)
  @UseGuards(GqlAuthGuard)
  whoAmIAdmin(@CurrentUser() user: UserDocument) {
    return this.userService.findOne(user.id);
  }
}
