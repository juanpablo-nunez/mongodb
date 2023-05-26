import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SaleService } from '../../service/sale/sale.service';
import { SaleDto } from '../../dto/sale.dto';
import { Sale } from '../../persistance/sale.interface';
import { UUID } from 'crypto';
import { version } from 'os';
import { IsMongoId } from 'class-validator';
import { ObjectIdValidationPipe } from 'src/guard/objectid.guard';
import { ObjectIdDto } from 'src/dto/tools/objectid.dto';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  @UsePipes(new ValidationPipe({ groups: ['post'] }))
  async create(@Body() createSaleDto: SaleDto): Promise<Sale> {
    return this.saleService.create(createSaleDto);
  }

  @Get()
  async findAll(): Promise<Sale[]> {
    return this.saleService.findAll();
  }

  @Get('summary/item')
  async summarizeByItem(): Promise<Sale[]> {
    return this.saleService.summarizeByItem();
  }

  @Get('summary/client')
  async summarizeByClient(): Promise<Sale[]> {
    return this.saleService.summarizeByClient();
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ groups: ['put'] }))
  async update(
    @Param('id') id: string,
    @Body() createSaleDto: SaleDto,
  ): Promise<Sale> {
    return this.saleService.update(id, createSaleDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Sale> {
    return this.saleService.delete(id);
  }

  @Get(':id')
  async getbyId(@Param('id') id: string): Promise<Sale> {
    return this.saleService.findSalebyId(id);
  }
}
