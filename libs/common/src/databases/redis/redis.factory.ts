import { Redis } from 'ioredis';

const customRedisClient: Record<string, Redis> = {};

export class RedisFactory {
  static getCustomRedisClient(host: string, port: number, dbNumber = 0): Redis {
    return dbNumber in customRedisClient
      ? customRedisClient[dbNumber]
      : this.createRedisClient(host, port, dbNumber);
  }

  static createRedisClient(host: string, port: number, dbNumber = 0): Redis {
    if (process.env.SSH_USED && JSON.parse(process.env.SSH_USED)) {
      host = '0.0.0.0';
    }

    const redis = new Redis({
      host: host,
      port: port,
      db: dbNumber,
    });

    customRedisClient[dbNumber] = redis;

    return redis;
  }
}
