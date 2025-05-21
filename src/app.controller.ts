import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('home')
  handleHomePage() {
    const message1 =this.appService.getHello();

    return{
      message: message1,
    }
    // return this.appService.getHello();
  }
}
