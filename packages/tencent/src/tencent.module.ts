import { Module, Provider } from '@nestjs/common';
import { ITencentCloudModuleOptions, TencentCloudClient, ITencentCloudModuleAsyncOptions } from './types/client';

@Module({})
export class TencentCloudModule {
  public static register<Client extends typeof TencentCloudClient>(tencentCloudModuleOptions: ITencentCloudModuleOptions<Client>) {
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

  public static registerAsync<Client extends typeof TencentCloudClient>(tencentCloudModuleAsyncOptions: ITencentCloudModuleAsyncOptions<Client>) {
    const clientsProviders: Provider[] = [];

    clientsProviders.push({
      provide: tencentCloudModuleAsyncOptions.useFactory,
      useFactory: async (...args: any[]) => {
        const tencentCloudModuleOptions = await tencentCloudModuleAsyncOptions.useFactory(...args);
        for (const tencentCloudModuleOption of tencentCloudModuleOptions.clients) {
          const { client, options } = tencentCloudModuleOption;
          clientsProviders.push({
            provide: client,
            useValue: new client(options),
          });
        }
        return tencentCloudModuleOptions;
      },
      inject: tencentCloudModuleAsyncOptions.inject,
    });

    return {
      module: TencentCloudModule,
      global: typeof tencentCloudModuleAsyncOptions.global === 'boolean' ? tencentCloudModuleAsyncOptions.global : false,
      providers: [...clientsProviders],
      exports: [...clientsProviders],
    };
  }
}
