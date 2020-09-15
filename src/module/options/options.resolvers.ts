import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { Permissions } from '@/common/decorator/Permissions.decorator';

import { OptionsService } from './options.service';
import { OptionsInfo } from './interface/options.interface';

@Resolver('Options')
export class OptionsResolver {
  constructor(private readonly optionsService: OptionsService) {}

  @Query()
  public getOptions() {
    return this.optionsService.getOptions();
  }

  @Mutation()
  @Permissions()
  public updateOptions(@Args('optionsInfo') optionsInfo: OptionsInfo) {
    return this.optionsService.updateOptions(optionsInfo);
  }
}
