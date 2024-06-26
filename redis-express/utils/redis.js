const { createClient } = require('redis');

const redisClient = createClient({
    password: 'D12mjOuXAfynmJn16mSq1Y3RBwl8P6wl',
    socket: {
        host: 'redis-10532.c90.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 10532
    }
});
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));
redisClient.connect();

module.exports=redisClient
