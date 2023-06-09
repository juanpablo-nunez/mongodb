import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from '../../persistance/client.interface';

import { ClientDto } from '../../dto/client.dto';
@Injectable()
export class ClientService {
  constructor(
    @InjectModel('Client') private readonly clientModel: Model<Client>,
  ) {}

  async create(CreateClientDto: ClientDto): Promise<Client> {
    const createdClient = new this.clientModel(CreateClientDto);
    return createdClient.save();
  }

  async findAll(): Promise<Client[]> {
    return this.clientModel.find().exec();
  }

  async findByCity(city: string): Promise<Client[]> {
    return this.clientModel.find({ 'address.city': city }).exec();
  }

  async update(id: string, CreateClientDto: ClientDto): Promise<Client> {
    await this.findById(id);
    return this.clientModel
      .findByIdAndUpdate(id, CreateClientDto, { new: true })
      .exec();
  }

  async findById(id: string): Promise<Client> {
    try {
      const client = await this.clientModel.findById(id);
      if (!client) {
        throw new NotFoundException('Sale not found!');
      }
      return client;
    } catch (error) {
      throw new NotFoundException('Sale not found!');
    }
  }

  async delete(id: string): Promise<Client> {
    await this.findById(id);
    return this.clientModel.findByIdAndRemove(id).exec();
  }
}
