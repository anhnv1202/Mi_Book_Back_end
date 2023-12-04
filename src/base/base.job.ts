import LogService from '@config/log.config';
import { CronJob } from 'cron';
import BaseClass from './base.class';

export default class BaseJob extends BaseClass {
  protected job: CronJob;

  constructor(
    protected name: string,
    protected time: string,
    protected start = true,
    protected timezone = process.env.TIMEZONE_DEFAULT,
  ) {
    super();
    this.name = name;
    this.time = time;
    this.timezone = timezone;
    this.start = start;
  }

  onTick() {
    LogService.logInfo(this.name, 'is running');
  }

  onComplete() {
    LogService.logInfo(this.name, 'is complete');
  }

  startJob() {
    try {
      this.job = new CronJob(this.time, this.onTick, this.onComplete, this.start, this.timezone);
      this.job.start();
    } catch (err) {
      LogService.logError(this.name, err as string);
    }
  }

  stop() {
    try {
      this.job.stop();
    } catch (err) {
      LogService.logError(this.name, err as string);
    }
  }
}
