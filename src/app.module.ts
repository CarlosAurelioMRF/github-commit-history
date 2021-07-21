import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RemoteServicesModule } from './remote-services/remote-services.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    RemoteServicesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
