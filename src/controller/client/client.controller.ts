import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Client } from 'src/persistance/client.interface';
import { ClientDto } from '../../dto/client.dto';
import { ClientService } from '../../service/client/client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @UsePipes(new ValidationPipe({ groups: ['post'] }))
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

  @Put(':id')
  @UsePipes(new ValidationPipe({ groups: ['put'] }))
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
