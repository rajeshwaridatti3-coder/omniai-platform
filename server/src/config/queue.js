import { Queue } from 'bullmq';
import IORedis from 'ioredis';
let connection; let publishQueue;
export function getQueue(){ if(!process.env.REDIS_URL) return null; if(!connection){ connection=new IORedis(process.env.REDIS_URL,{maxRetriesPerRequest:null}); publishQueue=new Queue('omniai-tasks',{connection}); } return publishQueue; }
export function getRedisConnection(){ if(!process.env.REDIS_URL) return null; if(!connection) connection=new IORedis(process.env.REDIS_URL,{maxRetriesPerRequest:null}); return connection; }
