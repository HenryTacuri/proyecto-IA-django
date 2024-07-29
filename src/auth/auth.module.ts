import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
//import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Preference, PreferenceSchema } from './entities/preference.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { 
        name: User.name,
        schema: UserSchema
      },
      { 
        name: Preference.name,
        schema: PreferenceSchema
      }
    ])
  ],
})
export class AuthModule {}
