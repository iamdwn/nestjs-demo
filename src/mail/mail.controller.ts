import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public, ResponseMessage } from '@/decorator/customize';
import { from } from 'form-data';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService,
    private mailerService: MailerService
  ) { }

  @Get()
  @Public()
  @ResponseMessage("test mail")
  async handleTestMail() {
    await this.mailerService.sendMail({
      to: "abc@gmail.com",
      from: "xyz@gmail.com",
      subject: "Test Mail",
      html: "<h1>Hello World</h1>"
    });
  }
}
