import { Injectable, Req } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from 'src/todos/todos.schema';
import { TodoDto } from './todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name)
    private todoModel: Model<Todo>,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}

  async getAll() {
    const todos = await this.todoModel.find();
    return todos;
  }

  async getOne(id: any) {
    const todos = await this.todoModel.findById(id);
    return todos;
  }

  async createTodo(todo: TodoDto) {
    const todos = await this.todoModel.create(todo);
    return todos;
  }

  async updateOne(id: any, body: any) {
    const todos = await this.todoModel.findByIdAndUpdate(
      id,
      {
        ...body,
      },
      {
        new: true,
      },
    );
    return todos;
  }

  async deleteOne(id: any) {
    const todos = await this.todoModel.findByIdAndDelete(id);
    return todos;
  }
}
