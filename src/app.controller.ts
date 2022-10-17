import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getTest(@Request() req){
    // Ici on peut récupérer le user directement dans la req en fait du moment qu'on a le jwt en bearer token header, et
    //passport le met directement dans req.user
    return {
      'text': `Hello from ${req.user.username}!`
    };
  }
}
