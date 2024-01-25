import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TencentCloudModule } from '@nailyjs.nest.modules/tencentcloud';
import { sms } from 'tencentcloud-sdk-nodejs';

@Module({
  imports: [
    TencentCloudModule.registerAsync({
      global: true,
      clients: [
        {
          client: sms.v20210111.Client,
          useFactory() {
            return {
              credential: {
                secretId: 'Dd',
                secretKey: 'vv',
              },
            };
          },
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
