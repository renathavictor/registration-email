const Mail = require('../lib/Mail');

const RegistrationMail = {
  key: 'RegistrationMail',
  async handle({ data }) {

    const { mailData } = data;

    await Mail.sendMail({
      from: `Administrador Olimpiada <admin@olimpiada.com>`,
      to: `${mailData.name} <${mailData.email}>`,
      subject: 'Registro em Edição',
      html: `<div style="text-align: center;margin-top: 4rem;">
      Olá, ${mailData.name}!
      <p>Você foi registrado para participar da edição <strong>${mailData.edition}</strong></p>
      <button style="text-decoration: none;background-color: #004A94;border: none;padding: 0.5rem;border-radius: 8px;">
        <a style="text-decoration: none;color: #FFF;" href='${mailData.link}' rel='noopener noreferrer' target='_blank'>Acesse<a>
      </button>
      </div>
      `
    });
  },
};

module.exports = RegistrationMail