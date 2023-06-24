const redis = require("redis");
const client = redis.createClient({
    legacyMode: true,
    host: 'localhost',
    port: 6379,
})
client.connect().catch(console.error);

module.exports = client;