import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { CollectionDBService } from 'src/entities/collectiondb.service';
import { MessageSenderService } from 'src/message/message.service';

@Injectable()
export class ScheduleService {
    private readonly logger = new Logger(ScheduleService.name);
    @Inject()
    private collectionService: CollectionDBService;
    @Inject()
    private messageSenderService: MessageSenderService;

    // @Interval(1000)
    // async handleCron() {
    //     this.logger.debug('Called when the second is 45');
    //     // 获取所有的collection
    //     const collections = await this.collectionService.findAll();
    //     // console.log('collections-----', collections);
    //     for await (const collection of collections) {
    //         console.log(collection);
    //     }
    // }

    @Interval(1000 * 3600)
    async handleInterval() {
        this.logger.debug('Called every 1 hours');
        // 获取所有的collection
        const collections = await this.collectionService.findAll();

        for await (const collection of collections) {

            // {pattern: "crawl", symbol: "nw", url: "https://magiceden.io/ordinals/marketplace/nw", type: ""}
            const sendMsg = {
                pattern: 'crawl',
                symbol: collection.collectionSymbol,
                url: `https://magiceden.io/ordinals/marketplace/${collection.collectionSymbol}`,
            }

            // 循环发送请求给rmq 拉取新的数据
            await this.messageSenderService.sendMessage(sendMsg);
        }
    }
}
