/* Notes
Gak bisa connect dari Windows ke Redis di WSL jadi pake cloud
*/

const Redis = require("ioredis");

const redis = new Redis({
  port: 18423,
  host: 'redis-18423.c1.ap-southeast-1-1.ec2.cloud.redislabs.com',
  family: 4,
  username: 'gaben',
  password: '3nHYtP6kyF5X4jT@'
});

module.exports = redis