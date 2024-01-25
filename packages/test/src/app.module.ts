import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TencentCloudModule } from '@nailyjs.nest.modules/tencentcloud';
import { sms } from 'tencentcloud-sdk-nodejs';

@Module({
  imports: [
    TencentCloudModule.registerAsync({
      inject: [],
      async useFactory() {
        return {
          clients: [
            {
              client: sms.v20210111.Client,
              options: {
                credential: {
                  secretId: '',
                  secretKey: '',
                },
              },
            },
          ],
          global: true,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
