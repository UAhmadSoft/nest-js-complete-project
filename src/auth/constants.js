import { ConfigService } from '@nestjs/config';

export const jwtConstants = {
  secret: ConfigService.get('JWT_SECRET'),
};
