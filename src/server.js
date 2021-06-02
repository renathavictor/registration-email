require('dotenv').config();
const express = require('express');
const cors = require("cors");

const MailController = require('./app/controllers/MailController');
const QueueNew = require('./app/lib/Queue');

const app = express();

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
const PORT = process.env.PORT || '3333'

app.listen(PORT, () => {
  console.log('Server running on localhost:' + PORT);
});