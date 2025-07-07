import { Controller, Get, Post, Render, Req, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { Public, ResponseMessage, User } from '@/decorator/customize';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { AuthenticatedGuard } from '@/stateful/passport/stateful.local.authenticated.guard';
import { Request, Response } from 'express';
import { IUser } from '@/users/users.interface';

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  handleLogin(@Req() req, @Res({ passthrough: true }) response: Response) {
    {
      return this.authService.login(req.user, response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @ResponseMessage("Get user info")
  @Get('/account')
  handleGetAccount(@User() user: IUser) {
    return { user };
  }

  //   @Get()
  //   getHomePage(@Req() req: Request, @Res() res: Response) {
  //     const isAuthenticated = req.isAuthenticated();
  //     return res.render('home', { isAuthenticated })
  //   }

  //   @Get('/login')
  //   async getLoginPage(@Req() req: Request, @Res() res: Response) {
  //     const isAuthenticated = req.isAuthenticated();
  //     if (isAuthenticated) {
  //       return res.redirect("/");
  //     }
  //     else return res.render('login')
  //   }

  //   @UseGuards(AuthenticatedGuard)
  //   @Render('user')
  //   @Get('/user')
  //   async getUserPage() {
  //     const usersList = await this.usersService.findAll();
  //     return { users: usersList };
  //   }

  //   @UseGuards(LocalAuthGuard)
  //   @Post('/login')
  //   async handleLoginStateful(@Req() req: Request, @Res() res: Response) {
  //     return res.redirect("/")
  //   }

  //   @Post('logout')
  //   logout(@Req() req: Request, @Res() res: Response) {
  //     /* destroys user session */
  //     req.session.destroy(function (err) {
  //       if (err) console.log(err)
  //       return res.redirect("/")
  //     });
  //   }
}
