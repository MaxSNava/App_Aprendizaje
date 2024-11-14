import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { GruposService } from './grupos.service';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('grupos')
export class GruposController {
  constructor(private readonly gruposService: GruposService) {}

  @Post()
  create(@Body() createGrupoDto: CreateGrupoDto) {
    return this.gruposService.create(createGrupoDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.gruposService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.gruposService.findOne(term);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateGrupoDto: UpdateGrupoDto,
  ) {
    return this.gruposService.update(id, updateGrupoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.gruposService.remove(id);
  }
}
