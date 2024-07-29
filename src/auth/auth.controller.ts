/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterUserDto, RegiterPreferenceDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('/login')
  login(@Body() loginDto : LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/register')
  register(@Body() registerDto : RegisterUserDto) {
    return this.authService.register(registerDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findUserById(id);
  }

  @Post('/preferences')
  registerPreference(@Body() registerPreferenceDto: RegiterPreferenceDto) {
    return this.authService.registerPreference(registerPreferenceDto);
  }

  @Get()
  getPreferences() {
    return this.authService.findAllPreferences()
  }

  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }*/

}
