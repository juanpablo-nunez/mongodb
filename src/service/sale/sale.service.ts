import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SaleDto } from '../../dto/sale.dto';
import { Sale } from '../../persistance/sale.interface';
import Redis from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
@Injectable()
export class SaleService {
  private TIME_CACHE = 2;
  private TYPE_TOKEN = 'EX';
  constructor(
    @InjectModel('Sale') private readonly saleModel: Model<Sale>,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async create(createSaleDto: SaleDto): Promise<Sale> {
    const createdSale = new this.saleModel(createSaleDto);
    return createdSale.save();
  }

  async findAll(): Promise<Sale[]> {
    return this.saleModel.find().exec();
  }

  // async summarizeByItem(): Promise<Record<string, number>> {
  //   const sales = await this.saleModel.find().exec();
  //   const summary: Record<string, number> = {};

  //   for (const sale of sales) {
  //     const item = sale.item;
  //     const quantity = sale.quantity;

  //     if (item in summary) {
  //       summary[item] += quantity;
  //     } else {
  //       summary[item] = quantity;
  //     }
  //   }

  //   return summary;
  // }

  // async summarizeByClient(): Promise<Record<string, number>> {
  //   const sales = await this.saleModel.find().exec();
  //   const summary: Record<string, number> = {};

  //   for (const sale of sales) {
  //     const client = sale.clientName;
  //     const quantity = sale.quantity;

  //     if (client in summary) {
  //       summary[client] += quantity;
  //     } else {
  //       summary[client] = quantity;
  //     }
  //   }

  //   return summary;
  // }

  async summarizeByItem(): Promise<Sale[]> {
    const cachedData = await this.redis.get('summarizeByItem');

    if (cachedData) {
      return JSON.parse(cachedData);
    }
    const data = await this.saleModel
      .aggregate([
        {
          $group: {
            _id: '$item',
            totalQuantity: { $sum: '$quantity' },
          },
        },
        {
          $project: {
            _id: 0,
            item: '$_id',
            totalQuantity: 1,
          },
        },
      ])
      .exec();
    await this.redis.set(
      'summarizeByItem',
      JSON.stringify(data),
      'EX',
      this.TIME_CACHE,
    );
    return data;
  }

  async summarizeByClient(): Promise<Sale[]> {
    const cachedData = await this.redis.get('summarizeByClient');

    if (cachedData) {
      return JSON.parse(cachedData);
    }
    const data = await this.saleModel
      .aggregate([
        {
          $group: {
            _id: '$clientName',
            totalQuantity: { $sum: '$quantity' },
          },
        },
        {
          $project: {
            _id: 0,
            clientName: '$_id',
            totalQuantity: 1,
          },
        },
      ])
      .exec();
    await this.redis.set(
      'summarizeByClient',
      JSON.stringify(data),
      'EX',
      this.TIME_CACHE,
    );
    return data;
  }

  async update(id: string, createSaleDto: SaleDto): Promise<Sale> {
    await this.findSalebyId(id);
    return this.saleModel
      .findByIdAndUpdate(id, createSaleDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Sale> {
    await this.findSalebyId(id);
    return this.saleModel.findByIdAndRemove(id).exec();
  }

  async findSalebyId(id: string): Promise<Sale> {
    try {
      const sale = await this.saleModel.findById(id).exec();
      if (!sale) {
        throw new NotFoundException('Sale not found!');
      }
      return sale;
    } catch (error) {
      throw new NotFoundException('Sale not found!');
    }
  }
}
