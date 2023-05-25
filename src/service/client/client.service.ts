import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from 'src/schemas/client.interface';
import { ClientDto } from 'src/dto/client.dto';
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
    return this.clientModel
      .findByIdAndUpdate(id, CreateClientDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Client> {
    return this.clientModel.findByIdAndRemove(id).exec();
  }
}
