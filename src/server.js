require('dotenv').config();
const express = require('express');
const cors = require("cors");

const MailController = require('./app/controllers/MailController');
// const BullBoard = require('bull-board');
const QueueNew = require('./app/lib/Queue');

const app = express();
const PORT = '3333'

// BullBoard.setQueues(QueueNew.queues.map(queue => queue.bull));

app.use(cors());
app.use(express.json());
app.post('/mail', MailController.store);

app.get("/test", (req, res) => {
  res.json({
    message: "This is a test."
  })
})

// app.use('/admin/queues', BullBoard.UI);

QueueNew.process();

app.listen(PORT, () => {
  console.log('Server running on localhost:' + PORT);
});