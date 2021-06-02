const Queue = require('../lib/Queue');

const MailController = {
  async store(req, res) {
    const { name, email, edition, link } = req.body;

    const mailData = {
      name,
      email,
      edition,
      link
    };

    try {
      await Queue.add('RegistrationMail', { mailData });

    } catch (error) {
      console.log("Erro aconteceu")
      console.log(error)
    }
    return res.json(mailData);
  }
};

module.exports = MailController;