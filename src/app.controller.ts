import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req){
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Request() req){
    let resultUser = await this.userService.create(req.body);
    console.log(this.authService.login(resultUser));
    return this.authService.login(resultUser);
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

  @UseGuards(JwtAuthGuard)
  @Get('my')
  getMyData(@Request() req){
    // get games data + user money
    let userData = this.userService.findOne(req.user.id);
    return userData;
  }
}
