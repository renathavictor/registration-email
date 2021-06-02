require('dotenv').config();
const Queue = require('bull') ;
const jobs = require('../jobs/RegistrationMail');
const redis = require('redis');
const client = redis.createClient({url: process.env.REDIS_HOSTNAME, password: process.env.REDIS_PASSWORD});

const queues = [
  {
    bull: new Queue(jobs.key, {
      redis: {
        host: client.connection_options.host,
        port: client.connection_options.port,
        password: process.env.REDIS_PASSWORD
      }
    }),
    name: jobs.key,
    handle: jobs.handle
  }
]

const QueueNew =  {
  queues,
  add(name, data) {
    const queue = this.queues.find(queue => queue.name === name);
    return queue.bull.add(data, queue.options);
  },
  process() {
    return this.queues.forEach(queue => {

      queue.bull.process(queue.handle);

      queue.bull.on('failed', (job, err) => {
        console.log('Job failed', queue.key, job.data);
        console.log(err);
      });
    })
  }
};

module.exports = QueueNew;