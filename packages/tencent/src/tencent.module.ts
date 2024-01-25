import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ITencentCloudModuleOptions, TencentCloudClient, ITencentCloudModuleAsyncOptions } from './types/client';

@Module({})
export class TencentCloudModule {
  constructor(private readonly moduleRef: ModuleRef) {}

  public static register<Client extends typeof TencentCloudClient>(tencentCloudModuleOptions: ITencentCloudModuleOptions<Client>): DynamicModule {
    const clientsProviders: Provider[] = [];
    for (const tencentCloudModuleOption of tencentCloudModuleOptions.clients) {
      const { client, options } = tencentCloudModuleOption;
      clientsProviders.push({
        provide: client,
        useValue: new client(options),
      });
    }

    return {
      module: TencentCloudModule,
      global: typeof tencentCloudModuleOptions.global === 'boolean' ? tencentCloudModuleOptions.global : false,
      providers: [...clientsProviders],
      exports: [...clientsProviders],
    };
  }

  public static async registerAsync<Client extends typeof TencentCloudClient>(
    tencentCloudModuleAsyncOptions: ITencentCloudModuleAsyncOptions<Client>,
  ): Promise<DynamicModule> {
    const clientsProviders: Provider[] = [];

    for (const tencentCloudModuleAsyncOption of tencentCloudModuleAsyncOptions.clients) {
      const { client, useFactory, inject } = tencentCloudModuleAsyncOption;

      clientsProviders.push({
        provide: client,
        useFactory: async (...args: any[]) => new client(await useFactory(...args)),
        inject,
      });
    }

    return {
      module: TencentCloudModule,
      providers: [...clientsProviders],
      exports: [...clientsProviders],
      global: typeof tencentCloudModuleAsyncOptions.global === 'boolean' ? tencentCloudModuleAsyncOptions.global : false,
    };
  }
}
