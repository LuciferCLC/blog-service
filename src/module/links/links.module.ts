import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LinksService } from './links.service';
import { LinksResolver } from './links.resolvers';
import { LinksSchema } from './schema/links.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Links', schema: LinksSchema }])],
  providers: [LinksService, LinksResolver]
})
export class LinksModule {}
