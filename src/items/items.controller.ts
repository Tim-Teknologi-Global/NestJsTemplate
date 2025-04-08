import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Request } from 'express';
import { User } from '../auth/schemas/user.schema';
@Controller('items')
@UseGuards(JwtAuthGuard)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  /**
   * Create a new item
   * @param createItemDto {CreateItemDto}
   * @returns {Item}
   */
  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }
  /**
   * Get all items
   * @param request {Request}
   * @returns {Item[]}
   */
  @Get()
  findAll(@Req() request: Request) {
    // this is how you get the user from the request
    const user = request.user as User;
    return this.itemsService.findAll();
  }
  /**
   * Get a single item by ID
   * @param id {string}
   * @returns {Item}
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }
  /**
   * Update a single item by ID
   * @param id {string}
   * @param updateItemDto {UpdateItemDto}
   * @returns {Item}
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(id, updateItemDto);
  }
  /**
   * Delete a single item by ID
   * @param id {string}
   * @returns {Item}
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(id);
  }
}
