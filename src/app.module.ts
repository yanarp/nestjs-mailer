require('dotenv').config()
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_ID, // generated ethereal user
          pass: process.env.EMAIL_PASS // generated ethereal password
        },
      },
      defaults: {
        from: '"nest-modules" <user@outlook.com>', // outgoing email ID
      },
      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
