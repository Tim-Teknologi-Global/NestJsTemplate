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
  UsePipes,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { JwtAuthGuard } from '../utils/guard/jwt-auth.guard';
import { JoiValidationPipe } from '../utils/pipes/validation.pipes';
import { Request } from 'express';
import {
  createItemSchema,
  deleteItemSchema,
  getItemByIdSchema,
  getItemSchema,
  updateItemSchema,
} from './item.validator';
import { User } from '../users/schemas/user.schema';
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
  @UsePipes(new JoiValidationPipe(createItemSchema))
  create(
    @Body()
    createItemDto: {
      name: string;
      description: string;
      amount: number;
    },
  ) {
    return this.itemsService.create(createItemDto);
  }
  /**
   * Get all items
   * @param request {Request}
   * @returns {Item[]}
   */
  @Get()
  @UsePipes(new JoiValidationPipe(getItemSchema))
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
  @UsePipes(new JoiValidationPipe(getItemByIdSchema))
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
  @UsePipes(new JoiValidationPipe(updateItemSchema))
  update(
    @Param('id') id: string,
    @Body()
    updateItemDto: {
      name?: string;
      description?: string;
      amount?: number;
    },
  ) {
    return this.itemsService.update(id, updateItemDto);
  }
  /**
   * Delete a single item by ID
   * @param id {string}
   * @returns {Item}
   */
  @Delete(':id')
  @UsePipes(new JoiValidationPipe(deleteItemSchema))
  remove(@Param('id') id: string) {
    return this.itemsService.remove(id);
  }
}
