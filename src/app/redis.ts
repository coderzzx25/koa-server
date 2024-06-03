import redis, { Redis } from 'ioredis';
import config from './config';

class RedisClient {
  public client: Redis;

  constructor() {
    this.client = new redis(parseInt(config.REDIS_PORT), config.REDIS_HOST);
    this.client.on('connect', () => {
      console.log('Redis 连接成功');
    });
    this.client.on('error', (err) => {
      console.log('Redis 连接失败', err);
    });
  }

  public set(key: string, value: string, seconds?: number) {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    if (seconds) {
      this.client.set(key, value, 'EX', seconds);
    } else {
      this.client.set(key, value);
    }
  }

  public async get(key: string) {
    const result = await this.client.get(key);
    if (!result) {
      return null;
    }
    try {
      return JSON.parse(result);
    } catch (error) {
      return result;
    }
  }

  public del(key: string) {
    this.client.del(key);
  }
}

export default new RedisClient();
