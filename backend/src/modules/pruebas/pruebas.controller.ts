import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PruebasService } from './pruebas.service';
import { CreatePruebaDto } from './dto/create-prueba.dto';
import { UpdatePruebaDto } from './dto/update-prueba.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('pruebas')
export class PruebasController {
  constructor(private readonly pruebasService: PruebasService) {}

  @Post()
  create(@Body() createPruebaDto: CreatePruebaDto) {
    return this.pruebasService.create(createPruebaDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.pruebasService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pruebasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePruebaDto: UpdatePruebaDto) {
    return this.pruebasService.update(+id, updatePruebaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pruebasService.remove(+id);
  }
}
