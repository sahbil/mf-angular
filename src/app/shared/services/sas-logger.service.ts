import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root',
})
export class SasNextLoggerService {
  constructor(private readonly logger: NGXLogger) {}

  public debug(message: any, ...additional: any[]) {
    this.logger.debug(message, additional);
  }

  public error(message: any, ...additional: any[]) {
    this.logger.error(message, additional);
  }

  public log(message: any, ...additional: any[]) {
    this.logger.log(message, additional);
  }

  public info(message: any, ...additional: any[]) {
    this.logger.info(message, additional);
  }

  public trace(message: any, ...additional: any[]) {
    this.logger.trace(message, additional);
  }

  public warn(message: any, ...additional: any[]) {
    this.logger.warn(message, additional);
  }

  public fatal(message: any, ...additional: any[]) {
    this.logger.fatal(message, additional);
  }
}
