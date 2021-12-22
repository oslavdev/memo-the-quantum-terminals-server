import nodemailer from "nodemailer";

const parameters = {
  from: `"Memo The Quantum Terminals" <${process.env.SMTP_EMAIL}>`, 
}

/**
 * Initialize nodemailer transporter
 */
interface NodeMailerOptions{
  host: string
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, 
  auth: {
    user: process.env.SMTP_EMAIL, // generated ethereal user
    pass: process.env.SMTP_PASSOWRD, // generated ethereal password
  },
} as NodeMailerOptions);

/**
 * Send email function
 * @name sendEmail
 * @param username 
 * @param email 
 * @param url 
 * 
 * @access public
 */
export async function sendEmail(username: string, email: string, url: string) {

  const mailOptions = {
    from: parameters.from, // sender address
    to: email, // list of receivers
    subject: "Welcome on board! ✔", // Subject line
    text: "Activate your account", // plain text body
    html: `
    <div style="
      width: 100%;
      background: #e4e4e4;
      color: #565656;
      padding: 30px;
    ">
    <h2 style="
      font-weight: 600;
      font-size:21px;
      margin-bottom:5px;
    ">
    Welcome ${username} ^^,
    </h2>
     <p
     style="
     font-size: 14px;
    "
     >
     Please confirm your email, opening the link below.
     </p>
     <a
     style="
      font-size: 14px;
      font-weight: 600;
      background: #82aeb9;
      padding: 5px 10px;
      color: white;
      text-decoration: none;
      cursor: pointer;
     "
     href="${url}">Confirm</a>
    </div>
    `, // html body
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

/**
 * Send email administrator is created function
 * @name sendEmailAdminIsCreated
 * @param username 
 * @param email 
 * @access public
 */
export async function sendEmailAdminIsCreated(username: string, email: string) {

  const mailOptions = {
    from:parameters.from, // sender address
    to: email, // list of receivers
    subject: "You are registered as administrator!", // Subject line
    text: "Activate your account", // plain text body
    html: `
    <div style="
      width: 100%;
      background: #e4e4e4;
      color: #565656;
      padding: 30px;
    ">
    <h2 style="
      font-weight: 600;
      font-size:21px;
      margin-bottom:5px;
    ">
    Welcome ${username} ^^. You are admin now!,
    </h2>
    </div>
    `, // html body
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}