import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from '@nestjs/jwt';
import { promisify } from 'util';
import { Reflector } from '@nestjs/core';

import { GetUser } from '../decorators/user.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();

    console.log('roles', roles);
    console.log('req.user', req.user);

    return roles.includes(req.user.role);
  }
}
