import { ClientRepository } from '@nailyjs.nest.modules/tencentcloud';
import { Controller, Get, Inject } from '@nestjs/common';
import { sms } from 'tencentcloud-sdk-nodejs';

@Controller()
export class AppController {
  @Inject(sms.v20210111.Client)
  private readonly client: ClientRepository<typeof sms.v20210111.Client>;

  @Get()
  public async getHello() {}
}
