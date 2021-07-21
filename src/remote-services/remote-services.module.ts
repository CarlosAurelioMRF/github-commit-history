import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateFetchCommitHandler } from '../commons/commands';
import { RemoteServicesController } from './remote-services.controller';

@Module({
  imports: [
    CqrsModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get<string>('GITHUB_API')
      }),
      inject: [ConfigService]
    }),
  ],
  controllers: [RemoteServicesController],
  providers: [CreateFetchCommitHandler]
})
export class RemoteServicesModule {}
