import { Module, CacheModule, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLError } from 'graphql';

import { config } from './config';
import { BlogLoggerModule } from './module/common/logger/logger.module';
import { BlogLogger } from './module/common/logger/logger';
import { AuthModule } from './module/auth/auth.module';
import { OptionsModule } from './module/options/options.module';
import { QiniuModule } from './module/qiniu/qiniu.module';
import { LinksModule } from './module/links/links.module';
import { HerosModule } from './module/heros/heros.module';
import { CommentsModule } from './module/comments/comments.module';
import { TagsModule } from './module/tags/tags.module';
import { ArticlesModule } from './module/articles/articles.module';
import { LikeModule } from './module/like/like.module';
import { AccessGuard } from './common/guards/AccessGuard';

@Module({
  imports: [
    CacheModule.register({
      max: 5,
      ttl: 5
    }),
    GraphQLModule.forRootAsync({
      imports: [BlogLoggerModule],
      useFactory: async (logger: BlogLogger) => ({
        typePaths: ['./**/*.graphql'],
        path: '/api/v2',
        context: ({ req, res }: { req: Request; res: Response }) => ({
          request: req
        }),
        formatError: (error: GraphQLError) => {
          logger.error(
            JSON.stringify({
              message: error.message,
              location: error.locations,
              stack: error.stack ? error.stack.split('\n') : [],
              path: error.path
            })
          );
          return error;
        }
      }),
      inject: [BlogLogger]
    }),
    MongooseModule.forRoot(config.MONGO_URL),
    AuthModule,
    OptionsModule,
    QiniuModule,
    LinksModule,
    HerosModule,
    CommentsModule,
    TagsModule,
    ArticlesModule,
    LikeModule
  ],
  providers: [{
    provide: APP_GUARD,
    useClass: AccessGuard
  }]
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(AuthMiddleware)
    //   .forRoutes(
    //     { path: '*', method: RequestMethod.POST }
    //   );
  }
}