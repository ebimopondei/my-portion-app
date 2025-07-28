import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private logger = new Logger(LoggerService.name);

  log(message: string) {
    this.logger.log(message);
  }
}