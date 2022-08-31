import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
// import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

const bcrypt = require('bcryptjs');

const jwtFactory = {
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET'),
    signOptions: {
      expiresIn: configService.get('JWT_EXPIRED'),
    },
  }),
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync(jwtFactory),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', function (next) {
            const user = this;
            if (!user.isModified('password')) {
              return next();
            }
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(user.password, salt, (err, hash) => {
                console.log('hash', hash);
                user.password = hash;
                next();
              });
            });
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    ConfigService,
    UserService,
    // LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
