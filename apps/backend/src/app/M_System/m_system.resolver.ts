import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { M_SystemService } from './m_system.service';
import { MSystem } from '@/schema/m-system/m-system.model';


@Resolver(() => MSystem)
export class M_SystemResolver {
  constructor(private readonly m_systemService: M_SystemService) {}

  @Query(() => [MSystem], { name: 'msystem' })
  async findAll() {
    return this.m_systemService.findAll();
  }

  @Query(() => MSystem, { name: 'msystem' })
  async findByParamNo(@Args('param_no') param_no: string) {
    return this.m_systemService.findBy_Param_key(param_no);
  }

  // @Query(() => Int, { name: 'countUser', nullable: true })
  // // @UseGuards(GqlAuthAdminGuard)
  // @UseGuards(GqlAuthGuard)
  // async count(@CurrentUser() user: User, @Args('filters') filters: FilterContactInput) {
  //   return await this.userService.count(filters);
  // }

  // @Query(() => [User], { name: 'users', nullable: true })
  // // @UseGuards(GqlAuthAdminGuard)
  // @UseGuards(GqlAuthGuard)
  // async findAll(@CurrentUser() user: User, @Args('filters') filters: FilterUserInput) {
  //   return await this.userService.findAll(filters);
  // }

  // @Query(() => Contact)
  // @UseGuards(GqlAuthGuard)
  // findOne(@CurrentUser() user: UserDocument, @Args('filters') filters: FilterCompanyInput) {
  //   return this.companyService.findOne('id');
  // }
}
