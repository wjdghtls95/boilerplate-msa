import { Redis } from 'ioredis';
import { ChainableCommander } from 'ioredis/built/utils/RedisCommander';
import { RedisFactory } from '@libs/common/databases/redis/redis.factory';

export abstract class AbstractRedisRepository {
  protected redis: Redis;
  protected readonly dbNumber: number;

  createRedisClient(host: string, port: number): void {
    this.redis = RedisFactory.createRedisClient(host, port, this.dbNumber);
  }

  async pipeline(): Promise<ChainableCommander> {
    return this.redis.pipeline();
  }

  async flushDb(): Promise<'OK'> {
    return this.redis.flushdb();
  }

  async close(): Promise<'OK'> {
    return this.redis.quit();
  }

  async delKeys(keys: string[]): Promise<number> {
    return this.redis.del(keys);
  }

  async renameKey(key: string, newKey: string): Promise<void> {
    await this.redis.rename(key, newKey);
  }

  async zAdd(key: string, scoreMember: number[]): Promise<void> {
    await this.redis.zadd(key, ...scoreMember);
  }
}
