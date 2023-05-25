import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Client } from 'src/schemas/client.interface';
import { ClientDto } from 'src/dto/client.dto';
import { ClientService } from 'src/service/client/client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() createClientDto: ClientDto): Promise<Client> {
    return this.clientService.create(createClientDto);
  }

  @Get()
  async findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }

  @Get(':city')
  async findByCity(@Param('city') city: string): Promise<Client[]> {
    return this.clientService.findByCity(city);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() createClientDto: ClientDto,
  ): Promise<Client> {
    return this.clientService.update(id, createClientDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Client> {
    return this.clientService.delete(id);
  }
}
