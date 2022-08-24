import { TodoService } from './todos.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParamData,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoDto } from './todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('/')
  getAllTodos(): any {
    return this.todoService.getAll();
  }

  @Post('/')
  async signup(@Body() todoDto: TodoDto): Promise<any> {
    return this.todoService.createTodo(todoDto);
  }

  @Get(':id')
  getTodo(@Param() params): any {
    return this.todoService.getOne(params.id);
  }

  @Patch(':id')
  updateTodo(@Param() params, @Body() todoDto: TodoDto): any {
    return this.todoService.updateOne(params.id, todoDto);
  }

  @Delete(':id')
  deleteTodo(@Param() params): any {
    return this.todoService.deleteOne(params.id);
  }
}
