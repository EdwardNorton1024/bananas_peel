import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, ClientProxy, Transport, ClientProxyFactory } from '@nestjs/microservices';

@Injectable()
export class MessageSenderService {
    private client: ClientProxy;

    constructor(private configService: ConfigService) {
        const rmqConfig = this.configService.get('rabbitmq');
        this.client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [`amqp://${rmqConfig.username}:${rmqConfig.password}@${rmqConfig.host}:${rmqConfig.port}}`],
                queue: 'spider', // 这是目标队列的名称
                queueOptions: {
                    durable: true,
                    autoDelete: true, // 如果回答为 "是"，则队列会在至少一个消费者连接后删除自己，然后所有消费者都断开连接时，队列会自动删除自己。这种情况下，当最后一个消费者取消订阅时，队列会自动删除自己。
                    exchange: 'spider',
                    routingKey: 'spider.classic.magiceden',
                },
                socketOptions: {
                    type: 'classic',
                    durable: true,
                    exchange: 'spider',
                },
            },
        });
    }

    async sendMessage(message: any) {
        const res = await this.client.connect();
        console.log(res);
        this.client.emit('crawl', message); // 这里的 'spider.classic.magiceden' 对应目标队列的路由键
        // await this.client.close();
    }
}
