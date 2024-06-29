import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jorgelina.mariano@gmail.com',
    // La contraseña se tiene que crear en Gmail - "Contraseña de Aplicaciones"
    pass: 'tvil vkdi jttl qnia',
  },
});

export const sendEmailChangePassword = async (email, linkChangePassword) => {
  const mailOption = {
    from: 'jorgelina.mariano@gmail.com',
    to: email,
    subject: 'Restablecer password',
    // Cuerpo del mail
    html: `
    <p>Haz click aquí para establecer una nueva contraseña:</p>
    <button><a href=${linkChangePassword}> Cambiar contraseña</a></button>
    `,
  };

  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.log('Error al enviar email para cambio de contraseña');
    } else {
      console.log('Correo enviado correctamente', info.response);
    }
  });
};
