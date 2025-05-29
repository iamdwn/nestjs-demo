import { Controller, Get, Post, Render, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { LocalAuthGuard } from './stateful/passport/stateful.local.auth.guard';
import { Request, Response } from 'express';
import { AuthenticatedGuard } from './stateful/passport/stateful.local.authenticated.guard';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './stateless/passport/stateless.jwt.auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  handleLogin(@Req() req){
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @Get()
  getHomePage(@Req() req: Request, @Res() res: Response) {
    const isAuthenticated = req.isAuthenticated();
    return res.render('home', { isAuthenticated })
  }

  @Get('/login')
  async getLoginPage(@Req() req: Request, @Res() res: Response) {
    const isAuthenticated = req.isAuthenticated();
    if (isAuthenticated) {
      return res.redirect("/");
    }
    else return res.render('login')
  }

  @UseGuards(AuthenticatedGuard)
  @Render('user')
  @Get('/user')
  async getUserPage() {
    const usersList = await this.usersService.findAll();
    return { users: usersList };
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async handleLoginStateful(@Req() req: Request, @Res() res: Response) {
    return res.redirect("/")
  }

  @Post('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    /* destroys user session */
    req.session.destroy(function (err) {
      if (err) console.log(err)
      return res.redirect("/")
    });
  }
}
