# Nest.js 版 Tencent Cloud Node SDK ☁️

中文 | [English](./README_EN.md)

[官方Node.js SDK](https://github.com/TencentCloud/tencentcloud-sdk-nodejs)

本SDK为官方Node.js SDK的nest.js版封装，提供了在nest中的更加简单的使用方式。

## 安装 📦

`npm`、`yarn`、`pnpm` 都支持，推荐使用 `pnpm`。

```bash
$ pnpm i --save @nailyjs.nest.modules/tencentcloud tencentcloud-sdk-nodejs
```

## 使用 👋

### 导入模块 🧩

首先，先导入模块并配置。建议在根模块中导入。

#### 正常用法 🚀

```typescript
import { Module } from '@nestjs/common';
import { sms } from 'tencentcloud-sdk-nodejs';
import { TencentCloudModule } from '@nailyjs.nest.modules/tencentcloud';

@Module({
  imports: [
    TencentCloudModule.registerAsync({
      // 如果你想在所有模块中使用这个客户端，你可以设置global为true。
      global: true,
      clients: [
        {
          // 你可以在这里注入其他Injectable，例如ConfigService。
          inject: [ConfigService],
          // 然后useFactory方法中的参数就是你注入的对象。
          useFactory: async (configService: ConfigService) => {
            // 返回腾讯云配置对象，👆和上面的正常的用法一样。
            return {
              credential: {
                secretId: 'Hello',
                secretKey: 'world',
              },
            };
          },
        },
      ],
    }),
  ],
})
export class AppModule {}
```

#### 异步用法 🚀

你也可以使用异步配置。换成`registerAsync` + `useFactory`方法即可。

```typescript
import { Module } from '@nestjs/common';
import { sms } from 'tencentcloud-sdk-nodejs';
import { TencentCloudModule } from '@nailyjs.nest.modules/tencentcloud';

@Module({
  imports: [
    TencentCloudModule.registerAsync({
      // 你可以在这里注入配置对象，例如ConfigService。
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        // 返回腾讯云配置对象，和上面的正常的用法一样。
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
})
export class AppModule {}
```

### 如何使用Client类 📝

```typescript
import { ClientRepository } from '@nailyjs.nest.modules/tencentcloud';
import { Injectable, Inject } from '@nestjs/common';
import { sms } from 'tencentcloud-sdk-nodejs';

@Injectable()
export class AppController {
  constructor(
    // 可以在这此注入腾讯云Client。例如，你想使用腾讯云的sms客户端，你可以这样做：
    @Inject(sms.v20210111.Client)
    private readonly client: ClientRepository<typeof sms.v20210111.Client>;
  ) {}

  public async sendSms() {
    // 像正常的服务一样使用sms客户端。类型仍然是保持安全的！
    const response = await this.client.SendSms({
      SmsSdkAppId: '',
      TemplateId: '',
      PhoneNumberSet: ['110'],
    });
  }
}
```

> ClientRepository 是一个泛型类型，你可以使用它来获取Client类们的类型。

## 作者 👨‍💻

###### **Zero**

- QQ：1203970284
- Gtihub: [跳转](https://groupguanfang/groupguanfang)

## ☕️ 捐赠 ☕️

如果你觉得这个项目对你有帮助，你可以请我喝杯咖啡QWQ~

![wechat](./screenshots/wechat.jpg)
![alipay](./screenshots/alipay.jpg)
