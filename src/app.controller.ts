import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  handshake(): string {
    return "Handshake successful!";
  }
}
