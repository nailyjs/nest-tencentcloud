import { AbstractClient } from 'tencentcloud-sdk-nodejs/tencentcloud/common/abstract_client';
import { ClientConfig } from 'tencentcloud-sdk-nodejs/tencentcloud/common/interface';

export class TencentCloudClient extends AbstractClient {
  constructor(...args: any[]) {
    super(args[0], args[1], args[2]);
  }
}

export interface ITencentCloudModuleOptionsClient<Client extends typeof TencentCloudClient> {
  client: Client;
  options: ClientConfig;
}

export interface ITencentCloudModuleOptions<Client extends typeof TencentCloudClient> {
  clients: ITencentCloudModuleOptionsClient<Client>[];
  global?: boolean;
}

export interface ITencentCloudModuleAsyncOptions<Client extends typeof TencentCloudClient> {
  useFactory: (...args: any[]) => Promise<ITencentCloudModuleOptions<Client>> | ITencentCloudModuleOptions<Client>;
  inject?: any[];
  global?: boolean;
}

export type ClientRepository<Client extends typeof TencentCloudClient> = InstanceType<Client>;
