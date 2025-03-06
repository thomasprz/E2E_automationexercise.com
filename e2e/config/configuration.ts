import * as dotenv from 'dotenv';

dotenv.config({ override: true });

export class Configuration {
  public static get email(): string {
    return process.env.EMAIL ?? '[NOT SET]';
  }
  public static get password(): string {
    return process.env.PASSWORD ?? '[NOT SET]';
  }
  public static get username(): string {
    return process.env.USERNAME ?? '[NOT SET]';
  }
}