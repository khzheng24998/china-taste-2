const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SG_KEY);

function sendLink(type, receiver, key)
{
  let subject = "";
  let emailBody = "";

  if (type === "reset")
	{
		let url = "localhost:3000/login?" + key;
    subject = "Password Reset";
		emailBody = "<p>To reset your password, please click on the following link:</p><a href='" + url + "'>" + url + "</a><p>If you did not request a password reset, please disregard this message.</p>";
	}

  const msg = {
    to: receiver,
    from: "noreply@chinatastevernon.com",
    subject: subject,
    html: emailBody
  };
  sgMail.send(msg);
}

module.exports.sendLink = sendLink;
